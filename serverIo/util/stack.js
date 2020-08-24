function Stack() {    
    let items = [];
    // 向栈添加新元素
    this.push = function (element) {
      items.push(element);
    };

    // 从栈内弹出一个元素
    this.pop = function () {
        return items.pop();
    };

    // 返回栈顶的元素
    this.peek = function () {
      return items[items.length - 1];
    };

    // 判断栈是否为空
    this.isEmpty = function () {
        return items.length === 0;
    };

    // 返回栈的长度
    this.size = function () {
      return items.length;
    };

    // 清空栈
    this.clear = function () {
      items = [];
    };
    this.list = function(){
      return items
    }
    // 打印栈内的所有元素
    this.print = function () {
      console.log(items.toString());
    };
}
module.exports = Stack