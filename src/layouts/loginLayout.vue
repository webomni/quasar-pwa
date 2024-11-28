<template>
  <q-layout view="hHh lpR fFf">
    <q-header :elevated="useLightOrDark(true, false)">
      <q-toolbar>
        <q-toolbar-title>
          <div class="absolute-center">
            <q-icon name="currency_exchange" />
            Money
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useLightOrDark } from "src/use/useLightOrDark";

defineOptions({
  name: "loginLayout",
});
</script>
