JS Code Style
====================

## Table of contents

- [Общее](#общее)
- [Нейминг](#нейминг)
- [Объявление переменных](#объявление-переменных)
- [Литералы](#литералы)
    - [Объекты](#объекты)
    - [Массивы](#массивы)
    - [Строки](#строки)
- [Точки с запятой](#точки-с-запятой)
- [Ключевые слова](#ключевые-слова)
- [Блочные объявления](#блочные-объявления)
- [if-switch](#if-switch)
    - [if](#if)
    - [switch](#switch)
- [Циклы](#циклы)
    - [for](#for)
    - [do...while](#dowhile)
- [Операторы](#операторы)
    - ['with'](#with)
    - [Сравнение](#сравнение)
    - [Тернарники](#тернарники)
    - [Унарные](#унарные)
- [eval](#eval)
- [undefined](#undefined)
- [Круглые скобки](#круглые-скобки)
- [Ошибки](#ошибки)
- [Type casting](#type-casting)
- [Объявления в несколько строк](#объявления-в-несколько-строк)
- [Чейнинг методов](#чейнинг-методов)
- [Соединение строк](#соединение-строк)
- [Пустые строки](#пустые-строки)
- [Комментарии](#комментарии)
- [Функции](#функции)
    - [this](#this)
    - [return](#return)
- [Классы](#классы)
- [Enums](#enums)
- [ES 15](#es-15)
    - [Strict mode](#strict-mode)
    - [Объявление переменных](#объявление-переменных-1)
    - [Классы](#классы-1)
    - [Стрелочные функции](#стрелочные-функции)
    - [Шаблонные строки](#шаблонные-строки)
    - [Дефолтные параметры](#дефолтные-параметры)
    - [Деструкторизация](#деструкторизация)
    - [Rest и spread](#rest-и-spread)
    - [Генераторы](#генераторы)
    - [Модули](#модули)
- [ES 17](#es-17)
    - [async-await](#async-await)

## Общее

* Кодировка файлов - UTF-8 без [BOM](http://en.wikipedia.org/wiki/Byte-order_mark).
* Рекомендованный символ перехода на новую строку - `\n`.
* Файлы должны оканчиваться символом LF.
* Один уровень отступов - 2 пробела.
* Длина строки - 100 символов.
* Конечный пробел в строке - убираем.

[&#8593; к оглавлению](#table-of-contents)

## Нейминг

* `variableNamesLikeThis`
* `functionNamesLikeThis`
* `functionArgumentsLikeThis`
* `ClassNamesLikeThis`
* `EnumNamesLikeThis`
* `methodNamesLikeThis`
* `CONSTANTS_LIKE_THIS`
* `namespacesLikeThis`
* `private` или `protected` проперти или методы должны быть с префиксом `_`
* Сокращенные и аббревиатурные имена лучше избегать
* Общие аббревиатуры (`JSON` или `XML`) пишем в  `CamelCase`. Например: `Json`, `Xml`.

[&#8593; к оглавлению](#table-of-contents)

## Объявление переменных

* Каждая переменная должна быть объявлена:
    * используя `const` или `let`;
    * только раз в текущей области видимости;
    * на новой строчке;
    * как можно ближе к своему месту использования.

* Каждый `const` или `let` должен объявлять только одну переменную.

**Хорошо:**

```js
const keys = ['foo', 'bar'];
const values = [23, 42];

const object = {};
while (items.length) {
    const key = keys.pop();
    object[key] = values.pop();
}
```

**Плохо:**

```js
let keys = ['foo', 'bar'],
    values = [23, 42],
    object = {},
    key;

while (items.length) {
    key = keys.pop();
    object[key] = values.pop();
}
```

[&#8593; к оглавлению](#table-of-contents)

## Литералы

### Объекты

* Необходим 1 пробел после и перед закрытыми фигурными скобками:

  ```js
  const obj = { a: 1, b: 2, c: 3 };

  this.method({ a: 1, b: 2 });
  ```

* Не должно быть пробела перед двоеточием:

  ```js
  const obj = {
      prop: 0
  };
  ```

* Только названия свойств должны быть выравнены в объявлениях (не значения):

  **Хорошо:**

  ```js
  const obj = {
      a: 0,
      b: 1,
      lengthyName: 2
  };
  ```

  **Плохо:**

  ```js
  const obj = {
      a          : 0,
      b          : 1,
      lengthyName: 2
  };
  ```

* Кавычки вокруг свойств должны быть использованы только тогда, когда это необходимо:

  **Хорошо:**

  ```js
  const obj = {
      key: 0,
      'key-key': 1
  };
  ```

  **Плохо:**

  ```js
  const obj = {
      'key': 0,
      'key-key': 1
  };
  ```

* Пробелы не используются внутри динамических свойств:

  **Хорошо:**

  ```js
  const value = obj[key];
  ```

  **Плохо:**

  ```js
  const value = obj[ key ];
  ```

[&#8593; к оглавлению](#table-of-contents)

### Массивы

* При перечислении элементов, пробелы используются тольк опосле запятых:

  ```js
  const fellowship = ['foo', 'bar', 'baz'];
  ```

[&#8593; к оглавлению](#table-of-contents)

### Строки

* Объявления содержат одинарные кавычки:

  ```js
  const lyrics = 'Never gonna give you up. Never gonna let you down. Never gonna turn around and desert you.';
  ```

* Если в строке содержится одинарная кавычка, то она должна быть экранирована:

  ```js
  const test = 'It shouldn\'t fail';
  ```

[&#8593; к оглавлению](#table-of-contents)

## Точки с запятой

Все должно оканчиваться точкой с запятой.

[&#8593; к оглавлению](#table-of-contents)

## Ключевые слова

* После ключевых слов всегда идет один пробел:

  ```js
  if (test) {
      // ...
  }

  function foo() {
      // ...
  }

  const bar = function () {
      // ...
  };
  ```

* Если после ключевого слова используется точка с запятой - пробела после него не следует:

  ```js
  return;
  ```

[&#8593; к оглавлению](#table-of-contents)

## Блочные объявления

* Открывающая фигурная скобка идет на той же строке с объявлением, предвыделенная пробелом:

  ```js
  if (test) {
      // ...
  }

  function foo() {
      // ...
  }
  ```
* Операторы ветвления и циклов всегда должны быть обернуты в фигурные скобки:

  **Хорошо:**

  ```js
  if (test) {
      return;
  }
  ```
  **Плохо:**

  ```js
  if (test)
      return;

  if (test) return;

  if (test) { return; }
  ```

[&#8593; к оглавлению](#table-of-contents)

## if-switch

### if

* Ключевое слово `else` должно быть на той же строке, что и закрывающая предыдущий блок фигурная скобка:

  ```js
  if (test) {
      // ...
  } else {
      // ...
  }
  ```

* Условные операторы не должны содержать операротов приравнивания:

  **Хорошо:**

  ```js
  const foo = bar();
  if (foo > 0) {
      // ...
  }
  ```

  **Плохо:**

  ```js
  let foo;
  if ((foo = bar()) > 0) {
      // ...
  }
  ```

* Логические операторы не должны использоваться для условного ветвления:

  **Хорошо:**

  ```js
  if (condition) {
      actionIfTrue();
  } else {
      actionIfFalse();
  }
  ```

  **Плохо:**

  ```js
  condition && actionIfTrue() || actionIfFalse();
  ```
  
  **Но пойдет:**

  ```js
  condition && action();
  ```

* Условия, превышающие [максимальную длину строки](#general) должны быть разделены следующим образом:

  ```js
  if (longCondition ||
      anotherLongCondition &&
      yetAnotherLongCondition
  ) {
      // ...
  }
  ```

* [Yoda conditions](http://en.wikipedia.org/wiki/Yoda_conditions) использовать не стоит:

  **Хорошо:**
  ```js
  if (getType() === 'driving') {

  }
  ```

  **Плохо:**
  ```js
  if ('driving' === getType()) {

  }
  ```

[&#8593; к оглавлению](#table-of-contents)

### switch

`switch` должен выглядеть следующим образом:

```js
switch (value) {
    case 1:
        // ...
        break;

    case 2:
        // ...
        break;

    default:
        // ...
        // без brake
}
```

[&#8593; к оглавлению](#table-of-contents)

## Циклы

### for

* Определения, окруженные круглыми скобками должны быть разделены пробелами после точки с запятой:

  **Хорошо:**

  ```js
  for (let i = 0; i < 10; i++) {
      doSomething();
  }
  ```

  **Плохо:**

  ```js
  for (let i = 0 ; i < 10 ; i++) {
      doSomething();
  }
  ```

* Избегайте сложных объявлений внутри скобок.

[&#8593; к оглавлению](#table-of-contents)

### do...while

* `while` должен находиться на той же строчке, что и закрывающая круглая скобка (как в [условных](#conditional-statements)):

  ```js
  do {
      statements;
  } while (condition);
  ```

[&#8593; к оглавлению](#table-of-contents)

## Операторы

### 'with'

`with` - не используем.

[&#8593; к оглавлению](#table-of-contents)

### Сравнение

Если не нужно преобразование типов, используем `===` или `!==`.

[&#8593; к оглавлению](#table-of-contents)

### Тернарники

Тернарные операторы должны использоваться следующем образом:

```js
const x = a ? b : c;

const y = a ?
    longButSimpleOperandB : longButSimpleOperandC;

const z = a 
        ? moreComplicatedB 
        : moreComplicatedC;
```

[&#8593; к оглавлению](#table-of-contents)

### Унарные

Унарные операторы используются без пробела между ним и кастуемым типом:

```js
const foo = !bar;
```

[Унарные операторы](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Special_operators).

[&#8593; к оглавлению](#table-of-contents)

## eval

`eval` не используем.
`json` надо исполнять с помощью [JSON.parse](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/JSON/parse).

[&#8593; к оглавлению](#table-of-contents)

## undefined

* Проверка на `undefined` в объявленной переменной (например, в объявлении функции) должно быт сделано с помощью строгого равенства `===`:

  > Explanation:
  > * В новых браузерах (`IE9+`, `Opera 12.16+`, `Firefox 4+`) [undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)
      иммутабельный (неконфигурируемый, неизменяемый объект в глобальной области видимости).
  > * Это предотвращает использование необъявленных переменных.

  **Хорошо:**

  ```js
  x === undefined
  ```

  **Плохо:**

  ```js
  typeof x === 'undefined'
  x === void 0
  ```

  **Ошибки:**

    * `typeof` нужно использовать, если нужна поддержка старых браузеров (например `IE8`), где `window.undefined` - мутабельный.
    * `typeof` может использоваться в местах, где ожидался тип `string`:

      ```js
      switch (typeof x) {
          case 'number':
              // ...
          case 'undefined':
              // ...
      }
      ```

* Проверка на наличие глобальной переменной должна быть выполненена с помощью `typeof` или с проверкой через глобальный `window`:

  > Пояснение: Попытка доступа к необъявленной переменной приведет к ошибке.

  ```js
  if (typeof Foo !== 'undefined') {
      // ...
  }

  // Тож норм, если используется только в браузере (`window` недоступна в Node.js)
  if (window.Foo !== undefined) {
      // ...
  }
  ```

[&#8593; к оглавлению](#table-of-contents)

## Круглые скобки

* Не использовать с унарными операторам `delete`, `typeof` и `void`, или ключевыми словами `return`, `throw` и `new`:

  **Хорошо:**:

  ```js
  delete obj.key;
  typeof x === 'number';
  new Type();
  throw new Error();
  ```

  **Плохо:**:

  ```js
  delete(obj.key);
  typeof(x) === 'number';
  new(Type)();
  throw(new Error());
  ```

* Лишние круглые скобки могут быть использованы в сложных тернарных операциях или логических вычислениях для улучшения читабельности:

  ```js
  ((a - b > c) && c) || (c + d && d + 1) || e; // тоже самое, что и a - b > c && c || c + d && d + 1 || e
  ```

[&#8593; к оглавлению](#table-of-contents)

## Ошибки

`throw` должен быть использован с `new Error` или с объектом, унаследованным от `Error`:

**Хорошо:**

```js
throw new Error('msg');
```

**Плохо:**

```js
throw 'msg';
```

[&#8593; к оглавлению](#table-of-contents)

## Type casting

Кастинг типов должен быть явным:

**Хорошо:**

```js
Boolean(foo)
Number(bar)
String(baz)
[].indexOf(qux) === -1 or [].indexOf(qux) < 0
```

**Плохо:**

```js
!!foo
+bar
baz + ''
~[].indexOf(qux)
```

[&#8593; к оглавлению](#table-of-contents)

## Объявления в несколько строк

* Если объявление больше, чем [длина строки](#general), оно переносится на следущую строки с сохранением отступов.
* Перенос должен быть осуществлен после оператора:

  ```js
  var debt = this.calculateBaseDebt() + this.calculateSharedDebt() + this.calculateDebtPayments() +
      this.calculateDebtFine();
  ```

* Закрыващая круглая скобка должна быть на следующей строчке конца текущего блока:

  **Хорошо:**

  ```js
  DoSomethingThatRequiresALongFunctionName(
      veryLongArgument1,
      argument2,
      argument3,
      argument4
  );
  anotherStatement;
  ```

  **Плохо:**

  ```js
  DoSomethingThatRequiresALongFunctionName(
      veryLongArgument1,
      argument2,
      argument3,
      argument4);
  anotherStatement;
  ```

[&#8593; к оглавлению](#table-of-contents)

## Чейнинг методов

Когда метод вызыван нановой строке, то он:
* Быть на один уровень отступа дальше, чем корневой объект.
* Начинаться с оператора доступа к методам `.`.

**Хорошо:**:

```js
someObject
    .operation()
    .operationWithCallback(function (obj) {
        obj.processed = true;
    })
   .end();
```

**Плохо:**:

```js
someObject.
   start().
   end();

someObject
.start()
.end();
```

[&#8593; к оглавлению](#table-of-contents)

## Соединение строк

* Строки должны быть объединены с помощью оператора `+`.
* `[].join('')` - избегаем.
* Экранирование символов переноса надо избегать.

**Хорошо:**

```js
const foo = 'A rather long string of English text, an error message ' +
    'actually that just keeps going and going -- an error ' +
    'message to make the Energizer bunny blush (right through ' +
    'those Schwarzenegger shades)! Where was I? Oh yes, ' +
    'you\'ve got an error and all the extraneous whitespace is ' +
    'just gravy.  Have a nice day.';
```

**Плохо:**

```js
const foo = 'A rather long string of English text, an error message \
          actually that just keeps going and going -- an error \
          message to make the Energizer bunny blush (right through \
          those Schwarzenegger shades)! Where was I? Oh yes, \
          you\'ve got an error and all the extraneous whitespace is \
          just gravy.  Have a nice day.';
```

[&#8593; к оглавлению](#table-of-contents)

## Пустые строки

Одна пустая строка может использоватьсядля разделения логических групп:

```js
doSomethingTo(x);
doSomethingElseTo(x);
andThen(x);

nowDoSomethingWith(y);

andNowWith(z);
```

[&#8593; к оглавлению](#table-of-contents)

## Комментарии

* Строчные коментарии начинаются с  `//`. После него необходим один пробел.
* Комменты к функциям, переменным и классам должны соответствовать [jsdoc](http://usejsdoc.org/) documentation syntax.

[&#8593; к оглавлению](#table-of-contents)

## Функции

### this

* Байндинг `this` к вызовам функции должен быть выполнен в соответствие с [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind):

  ```js
  doAsync(function () {
      this.fn();
  }.bind(this));
  ```

  **Заметочка:** в ECMAScript 6 желательно использовать [стрелочные функции](#arrow-functions).

* Приорететнее использование `this`, как аргумента, если такое возможно:

  **Хорошо:**

  ```js
  [1, 2, 3].forEach(function (n) {
      this.fn(n);
  }, this);
  ```

  **Плохо:**

  ```js
  [1, 2, 3].forEach(function (n) {
      this.fn(n);
  }.bind(this));
  ```

* Если присваиваем `this` к переменной, то она должна называться `_this`:

  ```js
  const _this = this;
  doAsync(function () {
      _this.fn();
  });
  ```

[&#8593; к оглавлению](#table-of-contents)

### Return

Приравнивание в `return` - избегаем

**Хорошо:**

```js
const lazyCompute = (function () {
    let result;
    return function () {
        if (!result) {
            result = compute();
        }
        return result;
    }
}());
```

**Плохо:**

```js
const lazyCompute = (function () {
    let result;
    return function () {
        return result || (result = compute());
    }
}());
```

[&#8593; к оглавлению](#table-of-contents)

## Классы

* "Симметричные" методы должны быть объявлены друг за другом, например:

  ```js
  function Foo() {}

  // Деструктор сразу после конструктора
  Foo.prototype.destruct = function () {};

  Foo.prototype.someMethod = function () {};
  ```

* Конструктор должен использоваться, как фабрика, т.е.:

  > Объяснение:
  > * Это делает код понятным.
  > * Это облегчает переход к  [ES6 классам](#classes-1), потому что создание экземпляра не может быт выполненным без `new`.

  **Плохо:**

  ```js
  function Foo(bar) {
      if (!(this instanceof Foo)) {
          return new Foo(bar);
      }
      // ...
  }

  const foo = Foo();
  ```

[&#8593; к оглавлению](#table-of-contents)

## Enums

* Названия Enums: `UpperCamelCase`.
* Члены Enums должны быть написаны через `ALL_CAPS`.

```js
const Color = {
    BLUE: '#0000dd',
    RED: '#dd0000'
};
```

[&#8593; к оглавлению](#table-of-contents)

## ES 15

Секция показывает codestyle к [ECMAScript 2015 Language Specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm).

### Strict mode

* [Strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) should be used.

  > Объяснение:
  > * Убирает многие [баги](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#Changes_in_strict_mode).
  > * Много интересных фич (например [классы](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), [let declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), block scopes) are available only in strict mode.
  > * Упрощает миграцию к  [ES6 modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/),
      т.к. они по умолчани используют `strict mode`.

* Strict mode должен быть объявлен явно, используя `'use strict'`.

  > То есть:
  > * Зависимости вашего кода могут НЕ работать в вашем коде.
  > * Ваш код МОЖЕТ использоваться в non-strict mode.

[&#8593; к оглавлению](#table-of-contents)

### Объявление переменных

* Не используйте `var`.
* Все немутабельные свойства должны быть объявленны черз [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const).
* [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) должна использоваться только для мутбельных.

  **Хорошо:**

  ```js
  const count = observers.length;
  let index = 0;
  while (index < count) {
      const observer = observers[index];
      observer(...args);
      index = index + 1;
  }
  ```

  **Плохо:**

  ```js
  let count = observers.length; // вот это
  let index = 0;
  while (index < count) {
      const observer = observers[index];
      observer(...args);
      index = index + 1;
  }

  const count = observers.length;
  let index = 0;
  while (index < count) {
      let observer = observers[index]; // что-то тут не так
      observer(...args);
      index = index + 1;
  }

  const count = observers.length;
  var index = 0; // var?
  while (index < count) {
      observers[index](...args);
      index = index + 1;
  }
  ```

* Если ссылка немутабельная, но значение - мутабельное, используем `const`:

  **Хорошо:**

  ```js
  const query = {};
  query.param = 'value';
  ```

  **Плохо:**

  ```js
  let query = {};
  query.param = 'value';
  ```

[&#8593; к оглавлению](#table-of-contents)

### Классы

* Классы объявляются с помощью ключевого слова `class`:

  **Хорошо:**

  ```js
  class Circle {
      constructor(x, y, radius) {
          this.x = x;
          this.y = y;
          this.radius = radius;
      }

      area() {
          return Math.PI * this.radius * this.radius;
      }
  }
  ```

  **Плохо:**

  ```js
  function Circle(x, y, radius) {
      this.x = x;
      this.y = y;
      this.radius = radius;
  }

  Circle.prototype.area = function () {
      return Math.PI * this.radius * this.radius;
  };
  ```

* После названия класса должен быть пробел: 

  **Хорошо:**

  ```js
  class Circle {}
  ```

  **Плохо:**

  ```js
  class Circle{}
  ```

* Не должно быть пробела после названия метода:

  **Хорошо:**

  ```js
  class Circle {
      area() {}
  }
  ```

  **Плохо:**

  ```js
  class Circle {
      area () {}
  }
  ```

* Небходим одинарный пробел перед фигурными скобками тела метода:

  **Плохо:**

  ```js
  class Circle {
      area(){}
  }
  ```

* Конструктор (если он есть) должен быть первым методом в классе:

  **Хорошо:**

  ```js
  class Circle {
      constructor() {}

      area() {}
  }
  ```

  **Плохо:**

  ```js
  class Circle {
      area() {}

      constructor() {}
  }
  ```

* Для наследования используется `extends`:

  **Хорошо:**

  ```js
  class Stream extends EventEmitter {}
  ```

  **Плохо:**

  ```js
  var util = require('util');

  class Stream() {
      constructor() {
          EventEmitter.call(this);
      }
  }

  util.inherits(Stream, EventEmitter);
  ```

[&#8593; к оглавлению](#table-of-contents)

### Стрелочные функции

* [Стрелочные функции](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
  должны быть использованы тогда, когда вы не хотите ее привязывать к контексту:

  > То есть: 
  > Стрелочные функции берут `this` из окружающего контекста, что избвляет от непредвиденых ошибок в runtime
  > при использовании `this`. Так же, это более эффективный способ, привязывающий `this`, чем `Function.prototype.bind`.
  ```js
  [1, 2, 3].map(x => {
      // ...
  });

  // Используем `function`, потому что передали `someObj` как `this`.
  [1, 2, 3].map(function (x) {
      // ...
  }, someObj);

  // Используем `function`, потому что предоставили название функции.
  decorate(function createSomething() {
      // ...
  });
  ```

* По возможности, не обрамляем аргументы в скобки (когда один):


  **Хорошо:**

  ```js
  [1, 2, 3].map(x => x * 2);
  [1, 2, 3].reduce((acc, n) => acc + n);
  ```

  **Не желательно:**

  ```js
  [1, 2, 3].map((x) => x * 2);
  ```

* Перед и после оператора (`=>`) необходим пробел:

  ```js
  [1, 2, 3].map(x => x * 2);
  ```

* Если тело метода состоит из одной строчки и `return`, можно опустить фигурные скобки и `return`:

  **Хорошо:**

  ```js
  [1, 2, 3].map(x => x * 2);
  ```

  **Плохо:**

  ```js
  [1, 2, 3].map(x => { return x * 2; });
  ```

[&#8593; к оглавлению](#table-of-contents)

### Шаблонные строки

* Пробелы внутри `${}` (после `${` и перед `}`) не используем:

  **Хорошо:**

  ```js
  `Hello ${name}`
  ```

  **Плохо:**

  ```js
  `Hello ${ name }`
  ```

[&#8593; к оглавлению](#table-of-contents)

### Дефолтные параметры

* Пробелы вокруг `=` необходимы:

  **Хорошо:**

  ```js
  function project(point, zoom = 23) {}
  ```

  **Плохо:**

  ```js
  function project(point, zoom=23) {}
  ```

[&#8593; к оглавлению](#table-of-contents)

### Деструкторизация

* В [деструкторизации](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
  правила для [объектов](#objects) и [массивов](#arrays) используются:

  **Хорошо:**

  ```js
  const [a, b] = someArray;
  const { a, b } = someObject;
  ```

  **Плохо:**

  ```js
  const [ a, b ] = someArray;
  const {a, b} = someObject;
  ```

* Если какое-то значение в  `array destructuring` игнорируется, не нужно выделять его пробелом:

  **Хорошо:**

  ```js
  const [first,, third] = ['foo', 'bar', 'baz'];
  const [,, third] = ['foo', 'bar', 'baz'];
  ```

  **Плохо:**

  ```js
  const [first, , third] = ['foo', 'bar', 'baz'];
  const [ , , third] = ['foo', 'bar', 'baz'];
  ```

* Для дефолтных значений пробелы вокруг `=` обязательны:

  **Хорошо:**

  ```js
  function sendRequest({cache = true, timeout = 200}) {}
  ```

  **Плохо:**

  ```js
  function sendRequest({cache=true, timeout=200}) {}
  ```

* Длинная дескруторизация используюся так:

  ```js
  const {
      protocol,
      hostname,
      port,
      pathname,
      query
  } = url.parse(urlString);

  function formatUrl({
      protocol,
      hostname,
      port,
      pathname,
      query
  }) {
      // ...
  }
  ```

[&#8593; к оглавлению](#table-of-contents)

### Rest и spread

* [Rest](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
  приоритетнее, чем [arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments).

* [Spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)
  приоритетнее, чем [Function.prototype.apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply).

* Пробелы перед `rest` или `spread` не используются:

  **Хорошо:**

  ```js
  let [head, ...tail] = someArray;
  function foo(...args) {}
  ```

  **Плохо:**

  ```js
  let [head, ... tail] = someArray;
  function foo(... args) {}
  ```

[&#8593; к оглавлению](#table-of-contents)

### Генераторы

* Значок `*` в [генераторах](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)
  должен быть прилеплен к `function`:

  **Хорошо:**

  ```js
  function* createIterator() {
      yield 1;
  }

  const createIterator = function* () {
      yield 1;
  };
  ```

  **Плохо:**

  ```js
  function *createIterator() {
      yield 1;
  }

  const createIterator = function * () {
      yield 1;
  };
  ```

* В [сокращенных методах](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions)
  значок должен быть прикреплен к  `method name`:

  **Хорошо:**

  ```js
  class Graph {
      *edges() {}
  }
  ```

  **Плохо:**

  ```js
  class Graph {
      * edges() {}
  }
  ```

* В [yield* expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield*)
  значок прикрепляем к `yield`:

  **Хорошо:**

  ```js
  function* gen() {
      yield* anotherGen();
  }
  ```

  **Плохо:**

  ```js
  function* gen() {
      yield *anotherGen();
  }
  ```

[&#8593; к оглавлению](#table-of-contents)

### Модули

* Правило, как и в объекте:

  **Хорошо:**

  ```js
  import { name1, name2 } from 'foo';
  ```

  **Плохо:**

  ```js
  import {name1, name2} from 'foo';
  ```

* Длинные [импорты](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
  и [экспорты](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
  пишутся так:

  ```js
  import {
      name1 as localName1,
      name2,
      name3,
      name4
  } from 'src/foo';

  export {
      name1 as exportName1,
      name2,
      name3,
      name4
  };
  ```

[&#8593; к оглавлению](#table-of-contents)

## ES 17

### async-await

* Избегаем бесполезный `return await`.

  > Объяснение: 
  > Async function ВСЕГДА обрамляется в `Promise`. Используя `return await`
  > мы оборачиваем это все в еще один промис, увеличивая время до его выполнения;

  **Хорошо:**

  ```js
  async function foo() {
      return bar();
  }
  ```

  **Плохо:**

  ```js
  async function foo() {
      return await bar();
  }
  ```

* Не использовать `async` когда нет полезного эффекта.

  Довольно легко привыкнуть к ситуации использования async, если что-то внутри делается асинхронно. 
  В некоторых случаях, это излишне. Если вы можете убрать async, не изменив логику функции - убирайте async. 

  **Хорошо:**

  ```js
  function afterTwoThings(first, second) {
      return Promise.all([first, second]);
  }
  ```

  **Плохо:**

  ```js
  async function afterTwoThings(first, second) {
      return Promise.all([first, second]);
  }
  ```

  Случаи, когда async важен:
    * Используйте в функции `await`.
    * Вы возвращаете ошибку асинхронно.
    * Вы возвращаете значение, которое вы хотите обернуть в промис.

  **Хорошо:**

  ```js
  async function asyncError() {
      throw new Error('Error!');
  }

  const asyncValue = async () => 'value';
  ```

[&#8593; к оглавлению](#table-of-contents)
