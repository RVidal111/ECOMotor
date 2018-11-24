<template>
    <div class="modal-mask">
        <div class="modal-container">
            <div class="modal-header">
                <i class="fa fa-times" @click="$emit('close')"></i>
            </div>
            <slot name="body">
            </slot>
            <slot name="footer">
            </slot>
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
    grid-row: 5 / 6;
    padding: 0;
    border: 0;
    display: grid;
    grid-template-columns: 15px 1fr 1fr 15px;
    grid-template-rows: 1fr;
}

.form-buttons-left {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.form-buttons-right {
    grid-column: 3 / 4;
    grid-row: 1 / 2;  
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
}

span, i {
    color: #757575;
    transition: .3s;
}

i {
    font-size: 17.5px;
}

span {
    font-size: 30px;
}

input {
    border-radius: 7.5px;
    height: 40px;
    margin-bottom: 10px;
    font-size: 14px;
    transition: .3s;
    color: #757575;
}

i:hover {
    color:#E57373;
    cursor: pointer;
}

span:hover {
    cursor: pointer;
}

.fa-floppy-o:hover {
    color: #81C784;
}

.fa-undo:hover {
    color: #424242;
}

.has-error {
    position: relative;
}

.has-error input {
    border-color:#E57373;
    color: #E57373;
    font-weight: bold;
}

.has-error input:focus {
    box-shadow: 0 1px 1px #64B5F601 inset, 0 0 8px #E57373;
    border-color:#E57373;
}

.has-error i {
    color: #E57373;
    font-size: 17.5px;
    position: absolute;
    transition: .3s;
    top: 11.25px;
    right: 11.25px;
}

.has-error i:hover {
    cursor: text;
}

input:focus {
    box-shadow: 0 1px 1px #64B5F601 inset, 0 0 8px #64B5F6;
    border-color: #64B5F6;
}

input[type=file]:focus {
    box-shadow: none ;
    border-color: none;
}

.row {
    margin: 0;
}
</style>