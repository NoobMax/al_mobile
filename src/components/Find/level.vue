<template>
  <div class="find-level">
   <ul>
     <li class="find-level__item vux-1px-b" v-for="i in 20" :key="i">
         <div class="level-item__number"><p>冠</p></div>
         <div class="level-item__body">
           <img v-lazy="require('../../assets/images/user/F02.png')" alt=""/>
           <div class="level-item__body-user">
             <p>TIMI_789</p>
             <span>至尊皇冠VIP</span>
           </div>
         </div>
         <div class="level-item__body-money">￥20000000.00</div>
     </li>
   </ul>
 </div>
</template>

