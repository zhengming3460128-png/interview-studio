const $ = id => document.getElementById(id);
const all = sel => [...document.querySelectorAll(sel)];
const links = {
 ut:'https://discover.engineering.utoronto.ca/faqs/',
 ubc:'https://www.sauder.ubc.ca/bachelor-commerce/bcom-video-interview',
 kira:'https://support.kiratalent.com/article/24-supported-browsers-and-devices',
 speed:'https://support.kiratalent.com/article/64-31-connection-playback-troubleshoot',
 av:'https://support.kiratalent.com/article/135-camera-mic-device-setup',
 vid:'https://vidcruiter.com/video-interviewing/applicant-support/'
};
const labels = {practice:'自拟练习',recalled:'往届考生回忆 · 意译', 'public-practice':'网友公开练习例 · 意译'};
const times = {ut:[[60,120],[60,180],[30,180]],ubc:[[30,90],[30,90],[30,90]]};
const checklist = ['用电脑接电源，摄像头置于眼睛高度。用正面光，避开背窗。','在浏览器和操作系统允许摄像头及麦克风。试播一段，确认选中了正确设备，声音清楚。','测试网速。优先用稳定 Wi-Fi 或有线，暂停同步、下载、直播，关闭占用摄像头的软件。','给自己留一段不被打扰的时间。静音通知，关掉其他设备与应用。','用正式平台的样题走完一遍。确认最后的完成状态或提交凭证。'];
const reference = (url,label) => '<a href="'+url+'" target="_blank" rel="noopener noreferrer">'+label+'</a>';
const guides = {
 ut:{title:'多大工程 Personal Profile',intro:'先预留约半小时，并提前在 Kira 做一次设备检查和样题。',steps:[
 '用 JOINid 进入 '+reference('https://portal.engineering.utoronto.ca/sites/myportal/','Engineering Applicant Portal')+'，找到 Personal Profile，按入口进入 Kira。进入平台后可先做设备检查和样题。核对按钮与条款，准备好才开始正式评估。',
 '正式评估用有摄像头、麦克风的笔记本或台式机。即使 Kira 通用支持部分手机，多大门户说明要求正式评估用电脑。推荐更新桌面 Chrome。Kira 通用最低网速为下载 10 Mbps、上传 5 Mbps。',
 '预留约 30 分钟。做完三道限时随机视频题，一次完成。本站使用一套示例计时。具体的准备及作答时间以申请门户当场显示为准。可按门户要求用纸临时记关键词。评估时独立完成，关掉本站、其他应用和设备，房间及线上都不要有旁人。',
 '录完后回工程门户确认 Personal Profile 完成，并完成整个 Engineering Supplemental Application。遇到上传故障，用平台支持并保留错误信息。',
 ],sources:[['ut','多大工程 FAQ'],['kira','Kira 浏览器与设备'],['av','Kira 摄像头与麦克风'],['speed','Kira 网速与故障']]},
 ubc:{title:'UBC Sauder BCom 视频面试',intro:'提前注册 VidCruiter 并验证邮箱，再安排一段安静的录制时间。',steps:[
 '从 '+reference(links.ubc,'Sauder 官方面试页')+' 的注册入口创建 VidCruiter 账号。查收验证邮件，找不到时检查垃圾邮件。平台账号与 UBC 申请门户分开。',
 '建议用有摄像头、麦克风的电脑和新版 Chrome。按 VidCruiter 的设备检查确认权限、声音与画面，再做可录制及回看的样题，官方说明允许最多练三次。',
 '三道正式题各一次。前两题偏经历或情境判断，第三题是虚构场景的创意挑战。看完题目后准备 30 秒，回答最多 90 秒。口头回答用自己的话，避免读稿。正式三题约 6 分钟，另留登录、检测和提交时间。',
 '检查录制上传成功，选出最好两题。把确认邮件里的专属视频链接粘贴到 UBC 申请指定栏位，再提交整个申请。发现技术问题先用页面底部的 VidCruiter 支持。',
 ],sources:[['ubc','Sauder 官方流程'],['vid','VidCruiter 设备支持']]}
};
let school='ut', view='guide', phase='idle', round=[], position=0, timer, deadline, stream, recorder, version=0;
const clipURLs=[];
function getSaved(key){try{return localStorage.getItem(key)}catch{return null}}
function save(key,val){try{localStorage.setItem(key,val)}catch{}}
$('category').innerHTML='<option value="">全部题型</option>'+groups.map((s,i)=>'<option value="'+i+'">'+s+'</option>').join('');
$('checks').innerHTML=checklist.map((s,i)=>'<label class="check"><input type="checkbox" data-key="check'+i+'"><span>'+s+'</span></label>').join('');
all('.check input').forEach(input=>{input.checked=getSaved(input.dataset.key)==='true';input.onchange=()=>save(input.dataset.key,String(input.checked))});
function guide(){
 const g=guides[school];
 $('schoolGuide').innerHTML='<article class="panel"><h2>'+g.title+'</h2><p>'+g.intro+'</p><div class="timings">'+times[school].map(([p,a],i)=>'<span class="pill">第 '+(i+1)+' 题 · '+p+'s 准备 / '+a+'s 回答</span>').join('')+'</div><ol>'+g.steps.map(s=>'<li>'+s+'</li>').join('')+'</ol><p>'+g.sources.map(([id,label])=>reference(links[id],label)).join(' · ')+'</p><p class="muted">官方样题请在正式平台的练习区查看。</p></article>';
}
function pool(){return questions.filter(q=>q.school==='both'||q.school===school)}
function card(q){
 const url=recalledSources[q.q]||recalledSources[q.source];
 const structure=q.kind==='case'?'先给判断或目标，再说缺什么信息、方案和取舍，最后说怎么验证。':'第一句就回答题目。简述背景，说明你做了哪一步，再说实际结果或重来会怎么做。';
 return '<p>'+structure+'</p>'+(url?'<p class="muted">'+reference(url,'查看原帖')+' · 来源是公开用户叙述，无法独立确认题目原文或本届抽题。</p>':'')+q.ids.map(id=>{
  const [title,facts,fiction,sample,recall]=stories[id];
  return '<details class="story"><summary>'+title+'</summary><p><strong>示例背景</strong> '+facts+'</p><p class="fiction">'+fiction+'</p><p class="example" lang="en">'+sample+'</p><p><strong>换回你自己的经历</strong> '+recall+'</p></details>';
 }).join('');
}
function bank(){
 const s=$('search').value.toLowerCase().trim(), c=$('category').value, p=$('source').value;
 const results=pool().filter(q=>(c===''||q.group===Number(c))&&(!p||q.source===p)&&(!s||[q.q,groups[q.group],...q.ids.flatMap(id=>stories[id].slice(0,2))].join(' ').toLowerCase().includes(s)));
 $('count').textContent=results.length+' 道题';
 $('questions').innerHTML=results.map(q=>'<details class="question"><summary><span lang="en">'+q.q+'</span><span class="pill">'+labels[q.source]+'</span></summary><div class="question-body">'+card(q)+'</div></details>').join('')||'<p class="panel">没有匹配题目。可以换个关键词或放宽筛选。</p>';
}
function selectView(next){
 if(view==='run'&&next!=='run'){reset();stopCamera()}
 view=next;
 ['guide','bank','run'].forEach(k=>$(k).hidden=k!==view);
 all('[data-view]').forEach(b=>b.setAttribute('aria-current',String(b.dataset.view===view)));
 if(view==='bank')bank();
}
function selectSchool(next){
 if(next!==school){reset();stopCamera()}
 school=next;
 all('[data-school]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.school===school)));
 guide();bank();
}
all('[data-view]').forEach(b=>b.onclick=()=>selectView(b.dataset.view));
all('[data-school]').forEach(b=>b.onclick=()=>selectSchool(b.dataset.school));
document.querySelector('.brand').onclick=e=>{e.preventDefault();selectView('guide')};
['search','category','source'].forEach(id=>$(id).oninput=bank);
function pick(choices){return choices[Math.floor(Math.random()*choices.length)]}
function choose(full){
 const available=pool(), selected=[];
 const stages=full?[q=>q.kind==='story',q=>q.kind==='story'||q.group===4,q=>q.group===5]:[()=>true];
 for(const stage of stages){
  const unused=available.filter(q=>!selected.includes(q));
  const matching=unused.filter(stage);
  selected.push(pick(matching.length?matching:unused));
 }
 return selected;
}
function display(sec){$('clock').textContent=[Math.floor(sec/60),sec%60].map(n=>String(n).padStart(2,'0')).join(':')}
function tick(){
 const left=Math.max(0,Math.ceil((deadline-Date.now())/1000));display(left);
 if(left===0)advance();
}
function startPhase(mode){
 clearInterval(timer);
 phase=mode;
 const prep=mode==='prep';
 $('phase').textContent=(prep?'准备':'回答')+' · '+(position+1)+' / '+round.length;
 $('skip').textContent=prep?'结束准备':'答完了';
 $('skip').hidden=false;
 const delay=times[school][position][prep?0:1];
 deadline=Date.now()+delay*1000;display(delay);
 if(!prep)record();
 timer=setInterval(tick,120);
}
function setQuestion(){
 $('promptText').textContent=round[position].q;
 $('promptText').lang='en';
 $('promptMeta').textContent=labels[round[position].source]+' · '+groups[round[position].group];
 startPhase('prep');
}
function advance(){
 if(phase==='prep'){startPhase('answer');return}
 if(phase!=='answer')return;
 clearInterval(timer);
 stopRecording();
 if(position+1<round.length){position++;setQuestion();return}
 phase='done';
 $('phase').textContent='本轮完成';$('skip').hidden=true;
 $('promptText').textContent='回看，再选一句你想改的地方。';
 $('promptMeta').textContent='检查有没有答到题目，有没有说清自己的行动，有没有在限时内收尾。';
 $('feedback').innerHTML=round.map(q=>'<details class="question"><summary lang="en">'+q.q+'</summary>'+card(q)+'</details>').join('');
 $('one').hidden=false;$('round').hidden=false;
}
function clearClips(){clipURLs.splice(0).forEach(URL.revokeObjectURL);$('clips').replaceChildren()}
function reset(){
 ++version;clearInterval(timer);stopRecording();clearClips();phase='idle';round=[];position=0;display(0);
 $('phase').textContent='准备开始';$('promptText').textContent='随机抽一题，或连做三题。';
 $('promptMeta').textContent='答完后再打开素材。';$('feedback').replaceChildren();
 $('skip').hidden=true;$('reset').hidden=true;$('one').hidden=false;$('round').hidden=false;
}
function begin(full){
 reset();round=choose(full);
 $('one').hidden=true;$('round').hidden=true;$('reset').hidden=false;
 setQuestion();
}
$('one').onclick=()=>begin(false);$('round').onclick=()=>begin(true);$('skip').onclick=advance;$('reset').onclick=reset;
async function camera(){
 if(stream){stopCamera();return}
 if(!navigator.mediaDevices?.getUserMedia){$('cameraStatus').textContent='当前浏览器不支持设备访问。可以继续纯计时练习，或用支持摄像头的 HTTPS 浏览器。';return}
 const requestedVersion=version;
 $('camera').disabled=true;
 try{
  const next=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user'},audio:true});
  if(view!=='run'||requestedVersion!==version){next.getTracks().forEach(t=>t.stop());return}
  stream=next;$('preview').srcObject=stream;$('preview').hidden=false;
  $('camera').textContent='关闭摄像头';
  $('cameraStatus').textContent=typeof MediaRecorder==='function'?'设备已连接。进入答题时自动录制，答完可回看。':'摄像头和麦克风已连接。当前浏览器只支持预览。';
 }catch{$('cameraStatus').textContent='无法打开设备。检查系统和浏览器权限，关闭占用设备的应用，然后重试。'}
 finally{$('camera').disabled=false}
}
function record(){
 if(!stream||typeof MediaRecorder!=='function')return;
 try{
  const active=new MediaRecorder(stream), chunks=[], q=position+1, runVersion=version;
  active.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};
  active.onstop=()=>{
   if(version!==runVersion||!chunks.length)return;
   const url=URL.createObjectURL(new Blob(chunks,{type:active.mimeType}));clipURLs.push(url);
   const label=document.createElement('p');label.textContent='第 '+q+' 题回看';
   const player=document.createElement('video');player.controls=true;player.playsInline=true;player.src=url;
   $('clips').append(label,player);
  };
  active.start();recorder=active;
 }catch{$('cameraStatus').textContent='当前浏览器无法录制，本题将继续计时。'}
}
function stopRecording(){if(recorder?.state==='recording')recorder.stop();recorder=null}
function stopCamera(){
 stopRecording();
 stream?.getTracks().forEach(t=>t.stop());stream=null;$('preview').srcObject=null;$('preview').hidden=true;
 $('camera').textContent='测试摄像头和麦克风';$('cameraStatus').textContent='可纯计时练习。启用后，只在本机浏览器录制。';
}
$('camera').onclick=camera;window.addEventListener('pagehide',stopCamera);
selectSchool('ut');selectView('guide');
