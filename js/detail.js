

(function (window) {

    function Detail(config) {
        this.config = config;
        this.html().bind().open();
    }
    Detail.prototype = {
        constructor: Detail,
        html: function () {
            let config = this.config;
            let data = config.data;
            let title = config.title;
            let wrapper = '<div class="detail-wrapper" id="detail_wrapper" style="display: none;"></div>'
            document.body.insertAdjacentHTML("afterbegin", wrapper);
            this.wrapper = document.getElementById("detail_wrapper");
            let html = [];
            html.push(
                `
                <div class="detail-box" id="detail_box">
                <div class="big-tit">${title}</div>
                <div class="detail-form scroll_1">
             `
            )
            // <i class="law-close"></i>
            for (let value of data) {
                html.push(`<div class="detail-area">`)
                if (value.subtitle) html.push(`<div class="little-tit">${value.subtitle}</div>`)
                html.push(this.item(value.children))
                html.push(`</div>`)
            }
            html.push(`
                </div>
                <div class="close-bottom">
                <div class="close-btn">确定</div>
                </div>
                </div>
            `);
            this.wrapper.innerHTML = html.join('').trim();
            return this;
        },
        item: function (arr) {
            let html = [];
            html.push('<table>');
            arr.forEach((item, index, arr) => {
                // 类型  input textarea
                let { type, name, value, formatter } = item;
                if (formatter) value = formatter(value);
                if (value == undefined) value = "";
                if (index % 2) {
                    // 奇数
                    html.push(this.template(type, name, value));
                    html.push('</tr>')
                } else {
                    html.push('</tr>')
                    html.push(this.template(type, name, value));
                }
            });
            html.push("</tr>");
            html.push("</table>");
            return html.join('').trim();
        },
        template: function (type, name, value) {
            switch (type) {
                case 'input':
                    return `<td class="one-td">${name + ':'}</td>
                <td class="two-td"><input value="${value}" readonly=true/></td>`
                case 'textarea':
                    return `<td class="one-td">${name + ':'}</td>
                    <td class="two-td"><textarea disabled="disabled">${value}</textarea></td>`
            }
        },
        bind: function () {
            var closeBtn = this.wrapper.querySelector('.close-btn');
            // var lawClose = this.wrapper.querySelector('.law-close');
            var handle = {
                handleEvent: (e) => {
                    // 排除点击窗口
                    if (e.currentTarget.id != 'detail_box') this.close();
                    e.stopPropagation();
                    e.preventDefault();
                    return;
                }
            };
            closeBtn.addEventListener('click', handle);
            this.wrapper.addEventListener('click', handle);
            this.wrapper.querySelector('#detail_box').addEventListener('click', handle);
            // lawClose.addEventListener('click', handle);
            return this;
        },
        open: function () {
            this.wrapper.style.display = 'block';
            return this;
        },
        close: function () {
            this.wrapper.style.display = 'none';
        },

    }
    if (!window.toast) {
        window.toast = {};
    }
    window.toast.detail = function(config) {
        return new Detail(config);
    } 
})(window)
