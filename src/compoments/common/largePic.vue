<template>
    <div>
        <div class="modal fade modal-dialog-center in" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
            <div class="modal-dialog modal-lg">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header white-bg white">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        </div>
                        <div class="modal-body" id="pic">
                            <img :src="src" style="width: 100%; height: 100%;" @click="rotate($event)">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>

</style>
<script>
    export default{
        props : ['src'],
        data(){
            return {
                current : 0
            }
        },
        components: {},
        methods : {
            rotate(ev){
//                console.log(ev.currentTarget);
                this.current = (this.current+90)%360;
                ev.currentTarget.style.transform = 'rotate('+this.current+'deg)';
//                $(ev.currentTarget).css('transform' , 'rotate(90deg)');
            }
        }
    }
</script>