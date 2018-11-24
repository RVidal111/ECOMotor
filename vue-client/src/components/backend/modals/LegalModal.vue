<template>
    <div class="modal-mask">
        <div class="modal-container">
            <div class="modal-header">
                <i class="fa fa-times" @click="$emit('close')"></i>
            </div>
            <div class="modal-body">
            </div>
            <div class="modal-footer">
            </div>
        </div>
    </div>
</template>

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
    grid-template-columns: 15px 300PX 15px;
    grid-template-rows: 15px 17.5px 15px 1fr 30px 15px;
    background: #FAFAFA url('/src/assets/img/background/bg.png') left top repeat;
    border-radius: 10px;
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
    padding: 0;
}

.modal-footer {
    grid-column: 2 / 3;
    grid-row: 6 / 7;
    padding: 0;
    border: 0;
    display: grid;
    grid-template-columns: 15px 1fr 1fr 15px;
    grid-template-rows: 1fr;
}

span, i {
    color: #757575;
    transition: .3s;
}

i {
    font-size: 17.5px;
}

i:hover {
    color:#E57373;
    cursor: pointer;
}
</style>