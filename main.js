/**
 * js  怎么 定义一个函数 ，等第一个回调中的异步代码执行完 ，再执行第二个回调函数
 * @param {*} firstTask 
 * @param {*} secondTask 
 */

function doAsyncTask(firstTask,secondTask){
    firstTask(() => {
        secondTask()
    })
}

// 第二个回调相当于作为参数传给第一个回调
doAsyncTask((done) => {
    setTimeout(() => {
        console.log('first')
        done()
    },2000)
},() => {
    console.log('second')
})

//使用promise

function doAsynctask1(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('first 1')
            resolve(0)
        },1000)
    })
}

doAsynctask1().then((res) => {
    console.log('second 1')
},(err) => {

})

// 使用   async  await 
async function doAsynctask2 (){
    await new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('first 2')
            resolve()
        },3000)
    })

    console.log('second 2')
}

doAsynctask2()

//promise  和 回调函数结合
function doAsynctask3(firstTask){
   return new Promise((resolve,reject) => {
        firstTask(() => {
            resolve()
        })
    })
}

doAsynctask3((done) => {
    setTimeout(() => {
        console.log('first 3')
        done()
    },4000)
}).then(() => {
    console.log('second 3')
})