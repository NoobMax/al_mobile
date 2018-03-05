<template>
  <div class="find-notify">
   <ul>
     <li class="find-notify__item vux-1px-b" v-for="i in 8" :key="i">
       <div class="notify-item__left"></div>
       <div class="notify-item__right">
         <div class="notify-item__right-title"><p>图标的制作和上传可以参照官网给出的</p></div>
         <div class="notify-item__right-date">2017-06-08</div>
         <div class="notify-item__right-caption">在WebKit浏览器或移动端（绝大部分是WebKit内核的浏览器）的页面实现比较简单，可以直接使用WebKit的CSS扩展属性(WebKit是私有属性)-webkit-line-clamp</div>
       </div>
     </li>
   </ul>
 </div>
</template>
