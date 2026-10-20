(function(){
  var $=function(i){return document.getElementById(i)};
  var num=$('num'),msg=$('msg'),go=$('go'),hist=$('hist'),history=[];
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function render(){
    hist.innerHTML='';
    if(!history.length){hist.innerHTML='<li class="empty" style="background:none;border:0;padding:0">Nenhum número sorteado ainda.</li>';return}
    history.forEach(function(n){var li=document.createElement('li');li.textContent=n;hist.appendChild(li)});
  }
  function rnd(a,b){return Math.floor(Math.random()*(b-a+1))+a}

  go.addEventListener('click',function(){
    var min=parseInt($('min').value,10),max=parseInt($('max').value,10);
    msg.textContent='';
    if(isNaN(min)||isNaN(max)){msg.textContent='Informe o intervalo completo.';return}
    if(min>max){msg.textContent='O valor inicial deve ser menor ou igual ao final.';return}
    var result;
    if($('rep').checked){result=rnd(min,max)}
    else{
      var pool=[];
      for(var i=min;i<=max;i++){if(history.indexOf(i)===-1)pool.push(i);if(pool.length>1e6)break}
      if(!pool.length){msg.textContent='Todos os números deste intervalo já foram sorteados. Limpe a lista ou ative repetidos.';return}
      result=pool[Math.floor(Math.random()*pool.length)];
    }
    go.disabled=true;num.classList.remove('done');num.classList.add('rolling');
    var finish=function(){
      num.textContent=result;num.classList.remove('rolling');void num.offsetWidth;num.classList.add('done');
      history.unshift(result);render();go.disabled=false;
    };
    if(reduce){finish();return}
    var t=0,timer=setInterval(function(){
      num.textContent=rnd(min,max);t+=60;
      if(t>=1200){clearInterval(timer);finish()}
    },60);
  });

  $('clear').addEventListener('click',function(){history=[];render();num.textContent='?';num.classList.remove('done');msg.textContent=''});
  render();
})();
