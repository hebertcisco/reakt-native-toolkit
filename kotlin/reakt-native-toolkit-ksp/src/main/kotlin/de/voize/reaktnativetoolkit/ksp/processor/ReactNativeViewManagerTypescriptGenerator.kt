package de.voize.reaktnativetoolkit.ksp.processor

import com.google.devtools.ksp.processing.CodeGenerator
import com.google.devtools.ksp.processing.KSPLogger
import io.outfoxx.typescriptpoet.CodeBlock
import io.outfoxx.typescriptpoet.CodeBlock.Companion.joinToCode
import io.outfoxx.typescriptpoet.FileSpec
import io.outfoxx.typescriptpoet.InterfaceSpec
import io.outfoxx.typescriptpoet.NameAllocator
import io.outfoxx.typescriptpoet.ParameterSpec
import io.outfoxx.typescriptpoet.PropertySpec
import io.outfoxx.typescriptpoet.TypeName
import java.util.Locale

private const val nativeComponentsModule = "nativeComponents"

/**
 * Generates typed wrapper components for the RN view managers generated by [ReactNativeModuleGenerator].
 * A wrapper is based on the respective component from `requireNativeComponent` and adds
 * typed props and transforms events into callbacks.
 */
internal class ReactNativeViewManagerTypescriptGenerator(
    private val codeGenerator: CodeGenerator,
    private val config: TypescriptConfig,
    private val logger: KSPLogger,
) {

    internal fun generate(
        rnViewManagers: List<ReactNativeViewManagerGenerator.RNViewManager>,
    ) {
        createRNViewManagersFile(rnViewManagers)
    }

    private fun createRNViewManagersFile(
        rnViewManagers: List<ReactNativeViewManagerGenerator.RNViewManager>,
    ) {
        val rnViewManagersFileBuilder = FileSpec.builder("$generatedTsFilePath$nativeComponentsModule")
        rnViewManagersFileBuilder.addComment("This file is generated by ReaktNativeToolkit. Do not edit.")
        rnViewManagers.forEach {
            generateTypescriptRNViewManager(it, rnViewManagersFileBuilder)
        }

        val originatingKSFiles = rnViewManagers.mapNotNull {
            it.wrappedFunctionDeclaration.containingFile
        }

        val rnModulesFile = rnViewManagersFileBuilder.build()
        rnModulesFile.writeTo(
            codeGenerator,
            kspDependencies(true, originatingKSFiles),
            extensionName = "tsx",
        )
    }

    private fun generateTypescriptRNViewManager(
        rnViewManager: ReactNativeViewManagerGenerator.RNViewManager,
        fileBuilder: FileSpec.Builder,
    ) {
        val nativePropsInterfaceName = "Native${rnViewManager.moduleName}Props"
        // we do not strictly need the native props interface as it is not user facing
        // but is helpful to sanity check the generated code, especially serialization code
        val nativePropsInterface = InterfaceSpec.builder(nativePropsInterfaceName).apply {
            rnViewManager.reactNativeProps.map { reactNativeProp ->
                when (reactNativeProp) {
                    is ReactNativeViewManagerGenerator.RNViewManager.ReactNativeProp.FlowProp -> {
                        addProperty(
                            PropertySpec.builder(
                                reactNativeProp.name,
                                getTypescriptSerializedTypeName(reactNativeProp.typeArgument),
                            ).build()
                        )
                    }
                    is ReactNativeViewManagerGenerator.RNViewManager.ReactNativeProp.FunctionProp -> {
                        addProperty(
                            PropertySpec.builder(
                                reactNativeProp.name,
                                TypeName.lambda(
                                    mapOf("event" to TypeName.ANY),
                                    TypeName.VOID,
                                )
                            ).build()
                        )
                    }
                }
            }
        }.build()

        val propsInterfaceName = rnViewManager.moduleName + "Props"
        val propsInterface = InterfaceSpec.builder(propsInterfaceName).apply {
            addSuperInterface(ViewPropsTypeName)
            rnViewManager.reactNativeProps.map { reactNativeProp ->
                when (reactNativeProp) {
                    is ReactNativeViewManagerGenerator.RNViewManager.ReactNativeProp.FlowProp -> {
                        addProperty(
                            PropertySpec.builder(
                                reactNativeProp.name,
                                getTypescriptTypeName(
                                    reactNativeProp.typeArgument,
                                    null,
                                    config.externalTypeMapping,
                                    config.defaultInstantJSType,
                                    logger,
                                ),
                            ).build()
                        )
                    }
                    is ReactNativeViewManagerGenerator.RNViewManager.ReactNativeProp.FunctionProp -> {
                        val parameters = reactNativeProp.parameters.withIndex().map {
                            ParameterSpec.builder(
                                "arg${it.index}",
                                getTypescriptTypeName(
                                    it.value,
                                    null,
                                    config.externalTypeMapping,
                                    config.defaultInstantJSType,
                                    logger,
                                )
                            ).build()
                        }

                        addProperty(
                            PropertySpec.builder(
                                reactNativeProp.name,
                                TypeName.lambda(
                                    parameters.withIndex().associate {
                                        it.value.name to it.value.type
                                    },
                                    TypeName.VOID,
                                )
                            ).build()
                        )
                    }
                }
            }
        }.build()

        fileBuilder.addType(nativePropsInterface)
        fileBuilder.addType(propsInterface)

        val nativeViewManagerVarName = "Native${rnViewManager.moduleName}"
        val nameAllocator = NameAllocator()
        nameAllocator.newName(nativeViewManagerVarName)

        fileBuilder.addCode(
            const(
                name = nativeViewManagerVarName,
                expression = CodeBlock.of(
                    "%T<%L>(\"%L\")",
                    RequireNativeComponentTypeName,
                    TypeName.implicit(nativePropsInterfaceName),
                    rnViewManager.moduleName,
                )
            )
        )

        val propsVarName = "props"
        fun String.toNativeEventVarName() = "native${replaceFirstChar {
            if (it.isLowerCase()) it.titlecase(Locale.getDefault()) else it.toString()
        }}"

        fileBuilder.addCode(
            const(
                name = rnViewManager.moduleName,
                expression = lambda(
                    listOf(
                        parameter(propsVarName, TypeName.implicit(propsInterfaceName))
                    ),
                    block(
                        CodeBlock.builder().apply {
                            rnViewManager.reactNativeProps.filterIsInstance<ReactNativeViewManagerGenerator.RNViewManager.ReactNativeProp.FlowProp>().forEach {
                                val type = it.typeArgument
                                val value = convertTypeToJson(
                                    "props.${it.name}".asCodeBlock(),
                                    type,
                                    nameAllocator.copy(),
                                    config.externalTypeMapping,
                                    config.defaultInstantJSType,
                                    logger,
                                )

                                add(
                                    const(
                                        it.name,
                                        CodeBlock.of(
                                            "%T(%L, %L)",
                                            UseMemoTypeName,
                                            lambda(
                                                listOf(),
                                                if (type.needsJSSerialization()) {
                                                    jsonStringifyName.asCodeBlock().invoke(listOf(value))
                                                } else {
                                                    value
                                                }
                                            ),
                                            "[props.${it.name}]",
                                        ),
                                    )
                                )
                            }

                            rnViewManager.reactNativeProps.filterIsInstance<ReactNativeViewManagerGenerator.RNViewManager.ReactNativeProp.FunctionProp>().forEach {
                                add(
                                    const(
                                        it.name.toNativeEventVarName(),
                                        CodeBlock.of(
                                            "%T(%L, %L)",
                                            UseCallbackTypeName,
                                            lambda(
                                                listOf(
                                                    parameter("event", TypeName.ANY)
                                                ),
                                                block(
                                                    CodeBlock.of(
                                                        "props.%L(%L)",
                                                        it.name,
                                                        it.parameters.withIndex().map { parameter ->
                                                            val varName = "event.nativeEvent.args[${parameter.index}]"

                                                            convertJsonToType(
                                                                if (parameter.value.needsJSSerialization()) {
                                                                    jsonParseName.asCodeBlock().invoke(listOf(
                                                                        varName.asCodeBlock()
                                                                    ))
                                                                } else {
                                                                    varName.asCodeBlock()
                                                                },
                                                                parameter.value,
                                                                nameAllocator.copy(),
                                                                config.externalTypeMapping,
                                                                config.defaultInstantJSType,
                                                                logger,
                                                            )
                                                        }.joinToCode(", ")
                                                    )
                                                )
                                            ),
                                            "[props.${it.name}]",
                                        ),
                                    )
                                )
                            }

                            add(returnStatement(
                                CodeBlock.of(
                                    "<%L %L %L />",
                                    nativeViewManagerVarName,
                                    // it is important to apply all props so
                                    // view props like style are applied
                                    CodeBlock.of(" {...%L}", propsVarName),
                                    rnViewManager.reactNativeProps.map {
                                        when (it) {
                                            is ReactNativeViewManagerGenerator.RNViewManager.ReactNativeProp.FlowProp -> {
                                                jsxProp(it.name, CodeBlock.of(it.name))
                                            }

                                            is ReactNativeViewManagerGenerator.RNViewManager.ReactNativeProp.FunctionProp -> {
                                                jsxProp(
                                                    it.name,
                                                    CodeBlock.of(it.name.toNativeEventVarName()),
                                                )
                                            }
                                        }
                                    }.joinToCode("\n"),
                                )
                            ))
                        }.build()
                    )
                )
            ).export()
        )
    }
}

private val ViewPropsTypeName = TypeName.namedImport("ViewProps", "react-native")
private val UseMemoTypeName = TypeName.namedImport("useMemo", "react")
private val UseCallbackTypeName = TypeName.namedImport("useCallback", "react")
private val RequireNativeComponentTypeName = TypeName.namedImport("requireNativeComponent", "react-native")