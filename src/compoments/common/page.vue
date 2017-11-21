<template>
    <div v-show="pg > 1">
        <nav aria-label="Page navigation" class="pull-right">
            <ul class="pagination">
                <li v-show="page != 1" @click="go_to(1)"><a>首页</a></li>
                <li v-show="page != 1" @click="page-- && go_to(page--)"><a>上一页</a></li>
                <li v-for="index in pages" @click="go_to(index)" :class="{'active':page == index}" :key="index">
                    <a>{{index}}</a>
                </li>
                <li v-show="pg != page && pg != 0" @click="page++ && go_to(page++)"><a>下一页</a></li>
                <li v-show="pg != page" @click="go_to(pg)"><a>尾页</a></li>
                <li><a>共&nbsp;(&nbsp;{{pg}}&nbsp;)&nbsp;页</a></li>
                <li><input type="text" class="skip" v-model="skip" @keyup.enter="skip_go_to()"
                           @keyup="skip = skip.replace(/[^\d]/g,'');"></li>
                <li @click="skip_go_to()"><a>GO</a></li>
            </ul>
        </nav>
    </div>
</template>
<style scoped>
    nav ul li {
        user-select: none;
    }
</style>
<script>
    export default {
        props: ['pg', 'beforePage'],
        data (){
            return {
                skip: '',
                page: 1,               //分页
                showItem: 5,           //显示条数
            }
        },
        watch: {
            beforePage (val){
                this.page = val;
            }
        },
        computed: {
            pages() {
                let pag = [];
                if (this.page < this.showItem) { //如果当前的激活的项 小于要显示的条数
                    //总页数和要显示的条数那个大就显示多少条
                    let i = Math.min(this.showItem, this.pg);
                    while (i) {
                        pag.unshift(i--);
                    }
                } else { //当前页数大于显示页数了
                    let middle = this.page - Math.floor(this.showItem / 2),//从哪里开始
                        i = this.showItem;
                    if (middle > (this.pg - this.showItem)) {
                        middle = (this.pg - this.showItem) + 1
                    }
                    while (i--) {
                        pag.push(middle++);
                    }
                }
                return pag
            }
        },
        methods: {
            go_to(index) {
                if (index === this.page) return;
                this.page = index;
                //这里可以发送ajax请求
                this.$emit('pag', this.page);
            },
            skip_go_to (){
                let reg = /[^\d]/;
                let flag = reg.test(this.skip);
                if (this.skip !== '' || flag) {
                    if (this.skip > this.pg || this.skip < 1) {
                        this.skip = '';
                    } else {
                        if (this.page !== this.skip) {
                            this.page = this.skip;
                            this.$emit('pag', this.page);
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .pagination {
        margin-top: 0;
        margin-bottom: 10px;
    }

    li {
        list-style: none;
    }

    a {
        text-decoration: none;
        cursor: pointer;
    }

    .pagination {
        position: relative;

    }

    .pagination li {
        display: inline-block;
    }

    .pagination li a {
        padding: .5rem 1rem;
        display: inline-block;
        border: 1px solid #ddd;
        background: #fff;

        color: #0E90D2;
    }

    .pagination li a:hover {
        background: #eee;
    }

    .pagination li.active a {
        background: #0E90D2;
        color: #fff;
    }

    .skip {
        vertical-align: top;
        margin-top: -18px;
        width: 50px;
        height: 32px;
        border: 1px solid #ddd;
        padding: 6px;
    }
</style>
