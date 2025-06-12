<template>
    <div class="loader pt-5 pb-4">
        <div class="element"></div>
        <div class="element "></div>
        <div class="element"></div>
    </div>
</template>
<style>
.loader {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
}

.element {
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background-color: #000000b4 !important;
    margin: 8px;
}

.element:nth-child(1) {
    animation: preloader 0.3s ease-in-out alternate infinite;
}

.element:nth-child(2) {
    animation: preloader 0.3s ease-in-out alternate 0.2s infinite;
}

.element:nth-child(3) {
    animation: preloader 0.3s ease-in-out alternate 0.4s infinite;
}

@keyframes preloader {
    100% {
        transform: scale(2);
    }
}
</style>