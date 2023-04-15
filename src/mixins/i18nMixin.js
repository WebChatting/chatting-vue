export default {
    computed: {
        currentLocale() {
            return this.$i18n.locale;
        },
    },
    watch: {
        currentLocale(newVal, oldVal) {
            console.log(`Language changed from ${oldVal} to ${newVal}`);
            localStorage.setItem("locale", newVal);
            this.$router.go(0);
        },
    },
};
