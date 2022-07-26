<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h3 v-for="(item, index) in 3" :key="index">{{ item }}{{ index }}</h3>
  </div>
</template>
