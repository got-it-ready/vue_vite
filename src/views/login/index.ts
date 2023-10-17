/*
 * @Description: ts装饰器
 * @Author: fjwu
 * @Date: 2023-06-20 13:51:18
 * @LastEditors: fjwu
 * @LastEditTime: 2023-06-20 15:32:34
 */
/* 类装饰器
 * 属性装饰器
 * 方法装饰器
 * 参数装饰器;
*/  

// 1. 类装饰器--无参数
const MessageDecorator: ClassDecorator = (target: Function) => {
    console.log(target, 'target'); // LoginController{}
    
    target.prototype.message = (context: string) => {
        console.log(context);
    };
};
@MessageDecorator
class LoginController {
    public login() {
        console.log('登入业务处理');
        console.log('登入成功消息');
        (this as any).message('恭喜登入成功');
        console.log(this);
        
    }
}
new LoginController().login();


// 2. 属性装饰器
function Controller(params) {
    return function (target: any, attribute: any) {
        console.log(target);
        console.log(attribute);
        console.log(params);
    };
}

class Services {
    @Controller(123)
    public moment: number;
}

const s:any = new Services();
console.log(s.prototype);


// 3.法装饰器

