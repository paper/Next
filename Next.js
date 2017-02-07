/* Next (c) paper 2017
 * @license MIT */

;(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Next = factory();
    }
})(this, function() {
    /**
     * 简约的 “职责链模式” 函数
     *
     * 简单说明下：
     *  1, 如果use里面的函数不存在异步，那么每次执行时，其实都会清空 _fns
     *  2, 一旦use里面存在异步执行，那么 use函数就会先把所有函数存储到 _fns, 再把存储在 _fns 里面的函数递归执行
     */
    function Next() {
        var _fns = [];
        var _action = true;

        function _next() {
            _action = true;
            _exec();
        }

        function _exec() {
            if( _fns.length != 0 ) {
                var item = _fns.shift();
                var fn = item[0];
                var context = item[1];

                fn.call(context, _next);
            }
        }

        return {
            use: function (fn, context) {
                context = context === undefined ? null : context;
                _fns.push([fn, context]);

                if( _action ) {
                    _action = false;
                    _exec();
                }
            }
        }
    }
    
    return Next;
});
