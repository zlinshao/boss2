<template>
    <div>
        <nav aria-label="Page navigation" class="pull-right">
            <ul class="pagination">
                <li @click="pre_page">
                    <a>
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li v-for="(p, index) in pg" @click="page_on(p, index)" :class="{'active': index === isActive}">
                    <a>{{ p }}</a>
                </li>
                <li @click="next_page">
                    <a>
                        <span>&raquo;</span>
                    </a>
                </li>
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
                isActive: 0,            //点击对应li
            }
        },
        computed:{

        },

        methods: {
            pre_page(){
                if (this.page > 1) {
                    this.page--;
                    this.isActive--;
                    this.$emit('pag', this.page)
                }
            },
            next_page (){
                if (this.page < this.pg) {
                    this.page++;
                    this.isActive++;
                    this.$emit('pag', this.page);
                }
            },
            page_on (p, e){
                this.isActive = e;
                this.page = p;
                this.$emit('pag', this.page);
            }
        }

    }
</script>

<style scoped>
    a {
        cursor: pointer;
    }
</style>
