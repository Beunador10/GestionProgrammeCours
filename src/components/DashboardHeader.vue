<script setup>
import { ref } from 'vue';

const dateTime = ref({
  date: "8 FEB",
  time: "10:00 AM",
  day: "Mercredi",
});

const InforUser = ref({
  nom: "Laurent",
  prenom: "SODJI",
});

// const promotions = ["Licence 1", "Licence 2", "Licence 3", "Master 1", "Master 2"];
// const filieres = ["Génie Logiciel", "Sécurité Informatique", "Intelligence Artificielle", "Système d'Information et Réseau Informatique"];

// const selectedPromotion = ref(promotions[0]);
// const selectedFiliere = ref(filieres[0]);
</script>

<template>
  <header class="py-7 flex items-center justify-between">
    <div class="flex-1 flex items-center justify-start gap-4">
      <div class="bg-gray-200 p-2 rounded-xl">
        <p class="font-bold text-xs">{{ dateTime.date }}</p>
        <p class="text-xs">{{ dateTime.time }}</p>
      </div>

      <p class="text-xl font-bold">
        {{ dateTime.day }}
      </p>
    </div>

    <div class="flex-1 flex items-center justify-end gap-4">
      <div class="rounded-full border-2 border-amber-300 w-11 h-11 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-[35px] h-[32]" viewBox="0 0 24 24">
          <path fill="#888888" d="M10 13.385q-.846 0-1.423-.596Q8 12.192 8 11.385q0-.685.31-1.009t.39-.859q-.023-.288-.111-.563t-.089-.57q0-.642.349-1.148t1.097-.819q.385-.382.829-.707T12 5.385q.82 0 1.244.344t.81.688q.748.312 1.097.819t.349 1.149q0 .294-.089.569t-.111.563q.08.535.39.859t.31 1.009q0 .807-.577 1.404T14 13.385zm-5 7.23V18.97q0-.619.36-1.158q.361-.54.97-.838q1.416-.679 2.834-1.018q1.417-.34 2.836-.34t2.837.34t2.832 1.018q.61.298.97.838q.361.539.361 1.158v1.646z"/>
        </svg>
      </div>
      <div class="flex items-center">
        <p class="pr-2">{{ InforUser.nom }}</p>
        <p>{{ InforUser.prenom }}</p>
      </div>
    </div>
  </header>
</template>

<style scoped>
</style>
