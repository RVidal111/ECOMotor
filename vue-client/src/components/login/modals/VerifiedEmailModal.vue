<template>
    <div class="modal-mask">
        <div class="modal-container">
            <div class="modal-header">
                <i class="fa fa-times pull-right" @click="$emit('close')"></i>
            </div>
            <div class="modal-body">
                <div class="display-flex">
                    <span class="fa fa-info"></span>
                </div>
                <div class="text">
                    <p class="p1">{{$t('modals.verifyEmailWarning')}}</p>
                    <p class="p2">{{$t('modals.questionForwardEmail')}}</p>
                </div>    
            </div>
            <div class="modal-footer">
                <div class="form-buttons-right">
                    <span class="fa fa-times" 
                          aria-hidden="true"
                          @click="$emit('close')"></span>
                    <span class="fa fa-check" aria-hidden="true"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00000080;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-container {
    display: grid;
    grid-template-columns: 15px 475PX 15px;
    grid-template-rows: 15px 17.5px 10px 1fr 30px 15px;
    background: #FAFAFA url('/src/assets/img/background/bg.png') left top repeat;
    border-radius: 10px;
    border: 1px solid #64B5F6;
    box-shadow: 0 1px 1px #64B5F601 inset, 0 0 8px #64B5F6;
}

.modal-header {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    padding: 0;
    border: 0;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
}

.modal-body {
    grid-column: 2 / 3;
    grid-row: 4 / 5;
    display: grid;
    grid-template-columns: 25px 10px 440px;
    grid-template-rows: 1fr;
    padding: 0;
}

.modal-body .display-flex {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-body .display-flex span {
    padding: 0;
    margin-top: 5px;
    font-size: 60px;
    color: #64B5F6;
}

.modal-body .text {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
}

.text p:hover {
    cursor: default;
}

.text p {
    font-weight: bold;
    margin-bottom: 5px;
    color: #434a54;
}

.text .p1 {
    font-size: 20px;
    line-height: 20px;
}

.text .p2 {
    font-size: 13px;
    line-height: 13px;
}

.modal-footer {
    grid-column: 2 / 3;
    grid-row: 5 / 6;
    padding: 0;
    border: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
}

.form-buttons-right {
    grid-column: 3 / 4;
    grid-row: 1 / 2;  
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;
}

span, i {
    color: #757575;
    transition: .3s;
}

i {
    font-size: 17.5px;
}

i:hover {
    color: #E57373;
    cursor: pointer;
}

span {
    font-size: 25px;
    padding-left: 15px;
}

.modal-footer span:hover {
    cursor: pointer;
}

.modal-footer span.fa-times:hover {
    color: #E57373;
}

.modal-footer span.fa-check:hover {
    color: #81C784;
}
</style>