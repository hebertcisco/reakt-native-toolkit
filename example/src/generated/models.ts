// This file is generated by ReaktNativeToolkit. Do not edit.

export namespace com {

  export namespace myrnproject {

    export namespace shared {

      export enum TestSealedTypeType {
        Option1 = 'option1',
        Option2 = 'option2',
        Option3 = 'option3'
      }

      interface TestSealedTypeBase<T extends TestSealedTypeType> {

        type: T;

      }

      /**
       * Sealed class generated from {@link com.myrnproject.shared.TestSealedType}
       */
      export type TestSealedType = TestSealedType.Option1 | TestSealedType.Option2 | TestSealedType.Option3;

      /**
       * Mapping generated from {@link com.myrnproject.shared.TestSealedType}
       */
      export function fromJsonTestSealedType(json: any): TestSealedType {
        const type = json['type'];
        switch (type) {
              case com.myrnproject.shared.TestSealedTypeType.Option1: return com.myrnproject.shared.TestSealedType.fromJsonOption1(json);
              case com.myrnproject.shared.TestSealedTypeType.Option2: return com.myrnproject.shared.TestSealedType.fromJsonOption2(json);
              case com.myrnproject.shared.TestSealedTypeType.Option3: return com.myrnproject.shared.TestSealedType.fromJsonOption3(json);
              default: throw new Error('Unknown discriminator value: ' + type);
            };
      }

      /**
       * Mapping generated from {@link com.myrnproject.shared.TestSealedType}
       */
      export function toJsonTestSealedType(value: TestSealedType): any {
        const type = value['type'];
        switch (type) {
              case com.myrnproject.shared.TestSealedTypeType.Option1: return com.myrnproject.shared.TestSealedType.toJsonOption1(value);
              case com.myrnproject.shared.TestSealedTypeType.Option2: return com.myrnproject.shared.TestSealedType.toJsonOption2(value);
              case com.myrnproject.shared.TestSealedTypeType.Option3: return com.myrnproject.shared.TestSealedType.toJsonOption3(value);
              default: throw new Error('Unknown discriminator value: ' + type);
            };
      }

      /**
       * Enum generated from {@link com.myrnproject.shared.Enum}
       */
      export enum Enum {
        Option1 = 'Option1',
        OPTION2 = 'OPTION2',
        OPTION_3 = 'OPTION_3'
      }

      /**
       * Mapping generated from {@link com.myrnproject.shared.Enum}
       */
      export function fromJsonEnum(json: any): Enum {
        return json;
      }

      /**
       * Mapping generated from {@link com.myrnproject.shared.Enum}
       */
      export function toJsonEnum(value: Enum): any {
        return value;
      }

      /**
       * Data class generated from {@link com.myrnproject.shared.Test}
       */
      export interface Test {

        name: string;

        list: Array<Test.Nested>;

        map: Record<string, Test.Nested>;

        long: number;

        bar: number;

      }

      /**
       * Mapping generated from {@link com.myrnproject.shared.Test}
       */
      export function fromJsonTest(json: any): Test {
        return {
          name: ((() => {
            const temp = json['name'];
            return temp;
          })()) as string,
          list: ((() => {
            const temp = json['list'];
            return temp.map((it: any) => ((() => {
              const temp_ = it;
              return com.myrnproject.shared.Test.fromJsonNested(temp_);
            })()) as com.myrnproject.shared.Test.Nested);
          })()) as Array<com.myrnproject.shared.Test.Nested>,
          map: ((() => {
            const temp = json['map'];
            return Object.fromEntries(Object.entries(temp).map(([key, value]: [any, any]) => [((() => {
              const temp_ = key;
              return temp_;
            })()) as string, ((() => {
              const temp_ = value;
              return com.myrnproject.shared.Test.fromJsonNested(temp_);
            })()) as com.myrnproject.shared.Test.Nested]));
          })()) as Record<string, com.myrnproject.shared.Test.Nested>,
          long: ((() => {
            const temp = json['long'];
            return temp;
          })()) as number,
          bar: ((() => {
            const temp = json['bar'];
            return temp;
          })()) as number
        };
      }

      /**
       * Mapping generated from {@link com.myrnproject.shared.Test}
       */
      export function toJsonTest(value: Test): any {
        return {
          name: (() => {
            const temp = value['name'];
            return temp;
          })(),
          list: (() => {
            const temp = value['list'];
            return temp.map((it: any) => (() => {
              const temp_ = it;
              return com.myrnproject.shared.Test.toJsonNested(temp_);
            })());
          })(),
          map: (() => {
            const temp = value['map'];
            return Object.fromEntries(Object.entries(temp).map(([key, value_]: [any, any]) => [(() => {
              const temp_ = key;
              return temp_;
            })(), (() => {
              const temp_ = value_;
              return com.myrnproject.shared.Test.toJsonNested(temp_);
            })()]));
          })(),
          long: (() => {
            const temp = value['long'];
            return temp;
          })(),
          bar: (() => {
            const temp = value['bar'];
            return temp;
          })()
        };
      }

      /**
       * Data class generated from {@link com.myrnproject.shared.DateTimeTest}
       */
      export interface DateTimeTest {

        instant: string;

        date: Date;

        dateAsString: string;

        localDateTime: string;

        duration: string;

        map: Record<string, Date>;

        dateOrNull: Date | null;

      }

      /**
       * Mapping generated from {@link com.myrnproject.shared.DateTimeTest}
       */
      export function fromJsonDateTimeTest(json: any): DateTimeTest {
        return {
          instant: ((() => {
            const temp = json['instant'];
            return temp;
          })()) as string,
          date: ((() => {
            const temp = json['date'];
            return new Date(temp);
          })()) as Date,
          dateAsString: ((() => {
            const temp = json['dateAsString'];
            return temp;
          })()) as string,
          localDateTime: ((() => {
            const temp = json['localDateTime'];
            return temp;
          })()) as string,
          duration: ((() => {
            const temp = json['duration'];
            return temp;
          })()) as string,
          map: ((() => {
            const temp = json['map'];
            return Object.fromEntries(Object.entries(temp).map(([key, value]: [any, any]) => [((() => {
              const temp_ = key;
              return temp_;
            })()) as string, ((() => {
              const temp_ = value;
              return new Date(temp_);
            })()) as Date]));
          })()) as Record<string, Date>,
          dateOrNull: ((() => {
            const temp = json['dateOrNull'];
            return temp === null ? null : (new Date(temp));
          })()) as Date | null
        };
      }

      /**
       * Mapping generated from {@link com.myrnproject.shared.DateTimeTest}
       */
      export function toJsonDateTimeTest(value: DateTimeTest): any {
        return {
          instant: (() => {
            const temp = value['instant'];
            return temp;
          })(),
          date: (() => {
            const temp = value['date'];
            return temp.toISOString();
          })(),
          dateAsString: (() => {
            const temp = value['dateAsString'];
            return temp;
          })(),
          localDateTime: (() => {
            const temp = value['localDateTime'];
            return temp;
          })(),
          duration: (() => {
            const temp = value['duration'];
            return temp;
          })(),
          map: (() => {
            const temp = value['map'];
            return Object.fromEntries(Object.entries(temp).map(([key, value_]: [any, any]) => [(() => {
              const temp_ = key;
              return temp_;
            })(), (() => {
              const temp_ = value_;
              return temp_.toISOString();
            })()]));
          })(),
          dateOrNull: (() => {
            const temp = value['dateOrNull'];
            return temp === null ? null : (temp.toISOString());
          })()
        };
      }

      /**
       * Type alias generated from {@link com.myrnproject.shared.TestTypeAlias}
       */
      export type TestTypeAlias = Test;

      /**
       * Mapping generated from {@link com.myrnproject.shared.TestTypeAlias}
       */
      export function fromJsonTestTypeAlias(json: any): Test {
        return ((() => {
          const temp = json;
          return com.myrnproject.shared.fromJsonTest(temp);
        })()) as com.myrnproject.shared.Test;
      }

      /**
       * Mapping generated from {@link com.myrnproject.shared.TestTypeAlias}
       */
      export function toJsonTestTypeAlias(value: Test): any {
        return (() => {
          const temp = value;
          return com.myrnproject.shared.toJsonTest(temp);
        })();
      }

      export enum TestSealedTypeWithCustomDiscriminatorType {
        Option1 = 'option1',
        Option2 = 'option2',
        Option3 = 'option3'
      }

      interface TestSealedTypeWithCustomDiscriminatorBase<T extends TestSealedTypeWithCustomDiscriminatorType> {

        customType: T;

      }

      /**
       * Sealed class generated from {@link com.myrnproject.shared.TestSealedTypeWithCustomDiscriminator}
       */
      export type TestSealedTypeWithCustomDiscriminator = TestSealedTypeWithCustomDiscriminator.Option1 | TestSealedTypeWithCustomDiscriminator.Option2 | TestSealedTypeWithCustomDiscriminator.Option3;

      /**
       * Mapping generated from {@link com.myrnproject.shared.TestSealedTypeWithCustomDiscriminator}
       */
      export function fromJsonTestSealedTypeWithCustomDiscriminator(json: any): TestSealedTypeWithCustomDiscriminator {
        const type = json['customType'];
        switch (type) {
              case com.myrnproject.shared.TestSealedTypeWithCustomDiscriminatorType.Option1: return com.myrnproject.shared.TestSealedTypeWithCustomDiscriminator.fromJsonOption1(json);
              case com.myrnproject.shared.TestSealedTypeWithCustomDiscriminatorType.Option2: return com.myrnproject.shared.TestSealedTypeWithCustomDiscriminator.fromJsonOption2(json);
              case com.myrnproject.shared.TestSealedTypeWithCustomDiscriminatorType.Option3: return com.myrnproject.shared.TestSealedTypeWithCustomDiscriminator.fromJsonOption3(json);
              default: throw new Error('Unknown discriminator value: ' + type);
            };
      }

      /**
       * Mapping generated from {@link com.myrnproject.shared.TestSealedTypeWithCustomDiscriminator}
       */
      export function toJsonTestSealedTypeWithCustomDiscriminator(value: TestSealedTypeWithCustomDiscriminator): any {
        const type = value['customType'];
        switch (type) {
              case com.myrnproject.shared.TestSealedTypeWithCustomDiscriminatorType.Option1: return com.myrnproject.shared.TestSealedTypeWithCustomDiscriminator.toJsonOption1(value);
              case com.myrnproject.shared.TestSealedTypeWithCustomDiscriminatorType.Option2: return com.myrnproject.shared.TestSealedTypeWithCustomDiscriminator.toJsonOption2(value);
              case com.myrnproject.shared.TestSealedTypeWithCustomDiscriminatorType.Option3: return com.myrnproject.shared.TestSealedTypeWithCustomDiscriminator.toJsonOption3(value);
              default: throw new Error('Unknown discriminator value: ' + type);
            };
      }

      /**
       * Object generated from {@link com.myrnproject.shared.FlowTest}
       */
      export interface FlowTest {
      }

      /**
       * Mapping generated from {@link com.myrnproject.shared.FlowTest}
       */
      export function fromJsonFlowTest(json: any): FlowTest {
        return json;
      }

      /**
       * Mapping generated from {@link com.myrnproject.shared.FlowTest}
       */
      export function toJsonFlowTest(value: FlowTest): any {
        return value;
      }

      /**
       * Data class generated from {@link com.myrnproject.shared.NonNested}
       */
      export interface NonNested {

        bar: string;

      }

      /**
       * Mapping generated from {@link com.myrnproject.shared.NonNested}
       */
      export function fromJsonNonNested(json: any): NonNested {
        return {
          bar: ((() => {
            const temp = json['bar'];
            return temp;
          })()) as string
        };
      }

      /**
       * Mapping generated from {@link com.myrnproject.shared.NonNested}
       */
      export function toJsonNonNested(value: NonNested): any {
        return {
          bar: (() => {
            const temp = value['bar'];
            return temp;
          })()
        };
      }

      export namespace TestSealedType {

        /**
         * Data class generated from {@link com.myrnproject.shared.TestSealedType.Option1}
         */
        export interface Option1 extends TestSealedTypeBase<TestSealedTypeType.Option1> {

          name: string;

          nested: Option1.Nested;

        }

        /**
         * Mapping generated from {@link com.myrnproject.shared.TestSealedType.Option1}
         */
        export function fromJsonOption1(json: any): Option1 {
          return {
            type: com.myrnproject.shared.TestSealedTypeType.Option1,
            name: ((() => {
              const temp = json['name'];
              return temp;
            })()) as string,
            nested: ((() => {
              const temp = json['nested'];
              return com.myrnproject.shared.TestSealedType.Option1.fromJsonNested(temp);
            })()) as com.myrnproject.shared.TestSealedType.Option1.Nested
          };
        }

        /**
         * Mapping generated from {@link com.myrnproject.shared.TestSealedType.Option1}
         */
        export function toJsonOption1(value: Option1): any {
          return {
            type: com.myrnproject.shared.TestSealedTypeType.Option1,
            name: (() => {
              const temp = value['name'];
              return temp;
            })(),
            nested: (() => {
              const temp = value['nested'];
              return com.myrnproject.shared.TestSealedType.Option1.toJsonNested(temp);
            })()
          };
        }

        /**
         * Data class generated from {@link com.myrnproject.shared.TestSealedType.Option2}
         */
        export interface Option2 extends TestSealedTypeBase<TestSealedTypeType.Option2> {

          number: number;

          nonNested: NonNested;

        }

        /**
         * Mapping generated from {@link com.myrnproject.shared.TestSealedType.Option2}
         */
        export function fromJsonOption2(json: any): Option2 {
          return {
            type: com.myrnproject.shared.TestSealedTypeType.Option2,
            number: ((() => {
              const temp = json['number'];
              return temp;
            })()) as number,
            nonNested: ((() => {
              const temp = json['nonNested'];
              return com.myrnproject.shared.fromJsonNonNested(temp);
            })()) as com.myrnproject.shared.NonNested
          };
        }

        /**
         * Mapping generated from {@link com.myrnproject.shared.TestSealedType.Option2}
         */
        export function toJsonOption2(value: Option2): any {
          return {
            type: com.myrnproject.shared.TestSealedTypeType.Option2,
            number: (() => {
              const temp = value['number'];
              return temp;
            })(),
            nonNested: (() => {
              const temp = value['nonNested'];
              return com.myrnproject.shared.toJsonNonNested(temp);
            })()
          };
        }

        /**
         * Object generated from {@link com.myrnproject.shared.TestSealedType.Option3}
         */
        export interface Option3 extends TestSealedTypeBase<TestSealedTypeType.Option3> {
        }

        /**
         * Mapping generated from {@link com.myrnproject.shared.TestSealedType.Option3}
         */
        export function fromJsonOption3(json: any): Option3 {
          return json;
        }

        /**
         * Mapping generated from {@link com.myrnproject.shared.TestSealedType.Option3}
         */
        export function toJsonOption3(value: Option3): any {
          return value;
        }

        export namespace Option1 {

          /**
           * Data class generated from {@link com.myrnproject.shared.TestSealedType.Option1.Nested}
           */
          export interface Nested {

            nullable: string | null;

          }

          /**
           * Mapping generated from {@link com.myrnproject.shared.TestSealedType.Option1.Nested}
           */
          export function fromJsonNested(json: any): Nested {
            return {
              nullable: ((() => {
                const temp = json['nullable'];
                return temp === null ? null : (temp);
              })()) as string | null
            };
          }

          /**
           * Mapping generated from {@link com.myrnproject.shared.TestSealedType.Option1.Nested}
           */
          export function toJsonNested(value: Nested): any {
            return {
              nullable: (() => {
                const temp = value['nullable'];
                return temp === null ? null : (temp);
              })()
            };
          }

        }

      }

      export namespace TestSealedTypeWithCustomDiscriminator {

        /**
         * Data class generated from {@link com.myrnproject.shared.TestSealedTypeWithCustomDiscriminator.Option1}
         */
        export interface Option1 extends TestSealedTypeWithCustomDiscriminatorBase<TestSealedTypeWithCustomDiscriminatorType.Option1> {

          name: string;

          nested: Option1.Nested;

        }

        /**
         * Mapping generated from {@link com.myrnproject.shared.TestSealedTypeWithCustomDiscriminator.Option1}
         */
        export function fromJsonOption1(json: any): Option1 {
          return {
            customType: com.myrnproject.shared.TestSealedTypeWithCustomDiscriminatorType.Option1,
            name: ((() => {
              const temp = json['name'];
              return temp;
            })()) as string,
            nested: ((() => {
              const temp = json['nested'];
              return com.myrnproject.shared.TestSealedTypeWithCustomDiscriminator.Option1.fromJsonNested(temp);
            })()) as com.myrnproject.shared.TestSealedTypeWithCustomDiscriminator.Option1.Nested
          };
        }

        /**
         * Mapping generated from {@link com.myrnproject.shared.TestSealedTypeWithCustomDiscriminator.Option1}
         */
        export function toJsonOption1(value: Option1): any {
          return {
            customType: com.myrnproject.shared.TestSealedTypeWithCustomDiscriminatorType.Option1,
            name: (() => {
              const temp = value['name'];
              return temp;
            })(),
            nested: (() => {
              const temp = value['nested'];
              return com.myrnproject.shared.TestSealedTypeWithCustomDiscriminator.Option1.toJsonNested(temp);
            })()
          };
        }

        /**
         * Data class generated from {@link com.myrnproject.shared.TestSealedTypeWithCustomDiscriminator.Option2}
         */
        export interface Option2 extends TestSealedTypeWithCustomDiscriminatorBase<TestSealedTypeWithCustomDiscriminatorType.Option2> {

          number: number;

          nonNested: NonNested;

        }

        /**
         * Mapping generated from {@link com.myrnproject.shared.TestSealedTypeWithCustomDiscriminator.Option2}
         */
        export function fromJsonOption2(json: any): Option2 {
          return {
            customType: com.myrnproject.shared.TestSealedTypeWithCustomDiscriminatorType.Option2,
            number: ((() => {
              const temp = json['number'];
              return temp;
            })()) as number,
            nonNested: ((() => {
              const temp = json['nonNested'];
              return com.myrnproject.shared.fromJsonNonNested(temp);
            })()) as com.myrnproject.shared.NonNested
          };
        }

        /**
         * Mapping generated from {@link com.myrnproject.shared.TestSealedTypeWithCustomDiscriminator.Option2}
         */
        export function toJsonOption2(value: Option2): any {
          return {
            customType: com.myrnproject.shared.TestSealedTypeWithCustomDiscriminatorType.Option2,
            number: (() => {
              const temp = value['number'];
              return temp;
            })(),
            nonNested: (() => {
              const temp = value['nonNested'];
              return com.myrnproject.shared.toJsonNonNested(temp);
            })()
          };
        }

        /**
         * Object generated from {@link com.myrnproject.shared.TestSealedTypeWithCustomDiscriminator.Option3}
         */
        export interface Option3 extends TestSealedTypeWithCustomDiscriminatorBase<TestSealedTypeWithCustomDiscriminatorType.Option3> {
        }

        /**
         * Mapping generated from {@link com.myrnproject.shared.TestSealedTypeWithCustomDiscriminator.Option3}
         */
        export function fromJsonOption3(json: any): Option3 {
          return json;
        }

        /**
         * Mapping generated from {@link com.myrnproject.shared.TestSealedTypeWithCustomDiscriminator.Option3}
         */
        export function toJsonOption3(value: Option3): any {
          return value;
        }

        export namespace Option1 {

          /**
           * Data class generated from {@link com.myrnproject.shared.TestSealedTypeWithCustomDiscriminator.Option1.Nested}
           */
          export interface Nested {

            nullable: string | null;

          }

          /**
           * Mapping generated from {@link com.myrnproject.shared.TestSealedTypeWithCustomDiscriminator.Option1.Nested}
           */
          export function fromJsonNested(json: any): Nested {
            return {
              nullable: ((() => {
                const temp = json['nullable'];
                return temp === null ? null : (temp);
              })()) as string | null
            };
          }

          /**
           * Mapping generated from {@link com.myrnproject.shared.TestSealedTypeWithCustomDiscriminator.Option1.Nested}
           */
          export function toJsonNested(value: Nested): any {
            return {
              nullable: (() => {
                const temp = value['nullable'];
                return temp === null ? null : (temp);
              })()
            };
          }

        }

      }

      export namespace Test {

        /**
         * Data class generated from {@link com.myrnproject.shared.Test.Nested}
         */
        export interface Nested {

          name: string;

          age: number;

        }

        /**
         * Mapping generated from {@link com.myrnproject.shared.Test.Nested}
         */
        export function fromJsonNested(json: any): Nested {
          return {
            name: ((() => {
              const temp = json['name'];
              return temp;
            })()) as string,
            age: ((() => {
              const temp = json['age'];
              return temp;
            })()) as number
          };
        }

        /**
         * Mapping generated from {@link com.myrnproject.shared.Test.Nested}
         */
        export function toJsonNested(value: Nested): any {
          return {
            name: (() => {
              const temp = value['name'];
              return temp;
            })(),
            age: (() => {
              const temp = value['age'];
              return temp;
            })()
          };
        }

      }

    }

  }

}
