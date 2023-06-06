<script>
    import { user } from "../../stores";
</script>

{#if $user && $user.isAdmin}
    <slot />
{/if}
