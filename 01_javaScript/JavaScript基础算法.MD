# JavaScript基础算法题目

1. 求1-100之间的质数

```(javaScript)
function getPrime(){
    for(var i = 1; i < 100; i++){
        var prime = 0;
        for(var j = 2; j < i; j++){
            if(i % j == 0){
                prime = 1;
                break;
            }
        }
        if(prime == 0 && i != 1){
            console.log(i)
        }
    }
}
```

2. 