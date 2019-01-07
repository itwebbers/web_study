# setTimeout && setInterval

## 用 setTimeout 来实现 setInterval

```JavaScript
  setTimeout(function(){
    setTimeout(rguments.callee, 200)
  }, 200)

  // 或者是

  function say (){
    // do something
    setTimeout(say, 200)
  }
  setTimeout(say, 200)
```
