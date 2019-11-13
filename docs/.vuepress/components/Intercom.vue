<template>
  <div></div>
</template>

<script>
  const APP_ID = 'gv1iimi1';
  window.intercomSettings = {
    app_id: APP_ID
  };

  export default {
    name: 'Intercom',
    data: function () {
      return {};
    },
    mounted: function () {
      this.$nextTick(function () {
        // Intercom snippet
        (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/' + APP_ID;var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
      });
    }
  }
</script>
