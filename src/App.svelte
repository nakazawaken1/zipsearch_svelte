<script lang="ts">
  import { zipsearch, ZipsearchResult } from "./lib/zipsearch";
  let zipcode = "";
  $: normalizedZipcode = zipcode.replace(/[^0-9]+/g, "");
  let promise: Promise<ZipsearchResult> = null;
</script>

<svelte:head>
  <title>郵便番号検索</title>
</svelte:head>
<main>
  <form on:submit|preventDefault={() => promise = zipsearch(normalizedZipcode)}>
    <input type="tel" bind:value={zipcode} />
    <button type="submit" disabled={normalizedZipcode.length != 7}
      >郵便番号検索</button
    >
  </form>
  {#if promise}
    {#await promise}
      <p>検索中...</p>
    {:then value}
      {#if value.status == 200}
        <ul>
          {#each value.results as item, i (item.address1 + item.address2 + item.address3)}
            <li>
              {i + 1}
              {item.zipcode}
              {item.address1 + item.address2 + item.address3}
              {item.kana1 + item.kana2 + item.kana3}
            </li>
          {/each}
        </ul>
      {:else}
        {value.message}
      {/if}
    {:catch error}
      {error}
    {/await}
  {/if}
</main>
