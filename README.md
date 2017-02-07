# Next
简约的 “职责链模式” 函数

```
var name = 'i am window';

var obj = {
    name : 'i am obj'
}

var app = Next();

app.use(function (next) {
    console.log(1);
    next();
});

app.use(function (next) {
    console.log(2);
    console.log(this.name) // i am window

    setTimeout(function () {
        console.log('2秒后')
        next();
    }, 2000)
});

app.use(function (next) {
    console.log(3);
    console.log(this.name) // i am obj
    next();
}, obj);

app.use(function (next) {
    console.log(4);
    // next();  // 不再往下执行use了
});

app.use(function (next) {
    console.log(5);
    setTimeout(function () {
        console.log('1秒后')
        next();
    }, 1000)
});

app.use(function (next) {
    console.log(6);
    next();
});
```