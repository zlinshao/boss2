<template>
    <div>
        <nav aria-label="Page navigation" class="pull-right">
            <ul class="pagination">
                <li v-show="page != 1" @click="go_to(1)"><a href="#">首页</a></li>
                <li v-show="page != 1" @click="page-- && go_to(page--)"><a href="#">上一页</a></li>
                <li v-for="index in pages" @click="go_to(index)" :class="{'active':page == index}" :key="index">
                    <a href="#">{{index}}</a>
                </li>
                <li v-show="pg != page && pg != 0 " @click="page++ && go_to(page++)"><a href="#">下一页</a></li>
                <li v-show="pg != page" @click="go_to(pg)"><a href="#">尾页</a></li>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        props: ['pg'],
        data (){
            return {
                page: 1,                //分页
                showItem: 5,            //显示条数
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
            }
        }
    }
</script>

<style scoped>
    li {
        list-style: none;
    }

    a {
        text-decoration: none;
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
</style>
