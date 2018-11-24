<template>
    <div class="content">
        <div class="breadcrumb">
            <ul class="breadcrumb-list">
                <li class="active">{{ $t('index') }}</li>
            </ul>
        </div>
        <div class="content-body"></div>
    </div>
</template>

<script>
    export default {}
</script>

<style scoped>
:root {
    --heightContent: 836.85px;
}

.breadcrumb {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    margin: 0px;
    padding: 0px;
    background-color: #E8E8E8;
    display: grid;
    grid-template-columns: 15px 1fr 16px;
    grid-template-rows: 6px 1fr 7px;
}

.breadcrumb-list {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    margin: 0px;
    padding: 0px;
    list-style: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 11px;
    font-weight: bold;
}

.breadcrumb-list li:nth-child(2n+2) {
    margin: 0px 10px;
}

.breadcrumb-list li.link a {
    color: #99a0aa;
}

.breadcrumb-list li.link a:hover {
    color: #22262E;
    text-decoration: none;
    cursor: pointer;
}

.breadcrumb-list li.spacer {
    color: #22262E;
    cursor: default;
}

.breadcrumb-list li.active {
    color: #22262E;
    cursor: default;
}
</style>
