// A compact bilingual concept index for this interview bank. Runs entirely in the browser.
const vocabulary = {
 intro:'introduce|introduce yourself|introduce myself|tell me about yourself|tell us about yourself|self introduction|who are you|介绍自己|自我介绍|你是谁',
 personality:'personality|personal traits|traits|strengths|unique|different|describe yourself|about me|what makes me|personal qualities|character|特点|性格|特质|优点|与众不同',
 interest:'interested|interest|hobbies|hobby|passion|talk about|favorite|favourite|兴趣|爱好|喜欢',
 motivation:'why engineering|why computer engineering|why did you choose|aspiration|aspirations|career|goals|future|why u of t|为什么学|为什么选|职业|目标|工程动机',
 technical:'engineering|software|algorithm|algorithms|programming|technical|coding|code|project|ai|技术|算法|编程|代码|项目',
 creativity:'creative|creativity|invent|innovation|创意|创新|创造力',
 curiosity:'curiosity|curious|wondered|好奇',
 initiative:'initiative|self taught|on your own|主动|自学',
 setback:'failure|failed|fail|hardship|setback|wrong|mistake|under pressure|challenge|unexpected|失败|挫折|犯错|挑战|没成功',
 feedback:'feedback|criticism|critique|criticized|criticised|criticize|advice|perspective|ask for help|asking for help|反馈|批评|建议|求助|被质疑',
 learning:'learned|learnt|learning|teach yourself|self taught|学到|学习|自学',
 teamwork:'teamwork|team|teams|teammate|teammates|group project|collaboration|collaborate|队友|合作|团队|小组',
 role:'role|role model|contribution|influence|mentor|榜样|角色|贡献|影响你',
 leadership:'leader|lead|leadership|leading|president|领导|带队|社长',
 community:'community|school club|club|volunteer|活动|社团|社区|学校',
 inclusion:'newcomer|newcomers|beginners|beginner|belonging|access|fairness|inclusive|inclusion|新人|新手|融入|公平|包容',
 responsibility:'responsible|responsibility|ownership|accountable|accountability|commitment|负责|责任|交接|担当',
 integrity:'integrity|honesty|honest|ethics|ethical|lie|truth|shared values|诚信|诚实|道德|价值观',
 tradeoff:'tradeoff|trade off|trade offs|tradeoffs|choose between|prioritize|prioritise|compromise|trade offs|取舍|权衡|优先级',
 testing:'measure|test|data|testing|results|metric|validate|baseline|evidence|experiment|验证|度量|测试|指标|数据|实验|基线',
 estimate:'estimate|estimating|estimation|fermi|how many|quantitative|估算|数量|费米',
 design:'design|prototype|engineering problem|pitch|invent|scenario|优化|设计|情景题|方案',
 conflict:'conflict|disagree|disagreement|opposed|argue|tension|resolve|冲突|争执|分歧|意见不合|不同意',
 empathy:'empathy|empathize|empathise|support|help someone|hurt|apology|apologize|apologise|feelings|friend|共情|支持|道歉|帮助|难过|朋友',
 culture:'culture|cultural|culturally|tradition|cross cultural|文化|跨文化|传统',
 travel:'travel|destination|visit anywhere|旅行|旅游|目的地',
 deadline:'deadline|on time|late|time limit|last minute|时间不够|迟交|准时|截止',
 persuasion:'persuade|convince|convinced|buy in|说服|拉拢'
};
const adjacentTopics = {
 intro:['personality','interest','motivation'], personality:['intro','interest','role'],
 motivation:['technical','interest'], feedback:['learning','setback'],
 conflict:['teamwork','persuasion','empathy'], community:['inclusion','leadership'],
 culture:['empathy','learning'], testing:['technical','estimate']
};
const stopWords=new Set('a an the to of for in it is are do did does have had be you your i me my we us our and or but what can how would could when tell about with their they were was on as at from if will so something time'.split(' '));
function normalizeSearch(value){
 return value.normalize('NFKC').toLowerCase().replace(/[’']/gu,'').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
}
const aliases=Object.entries(vocabulary).map(([id,terms])=>[id,terms.split('|').map(normalizeSearch)]);
function containsPhrase(query, phrase){
 return /\p{Script=Han}/u.test(phrase) ? query.includes(phrase) : (' '+query+' ').includes(' '+phrase+' ');
}
function queryConcepts(query){
 const vector={};
 for(const [id,terms] of aliases){
  const matches=terms.filter(term=>containsPhrase(query,term));
  if(matches.length) vector[id]=1+Math.max(...matches.map(term=>term.split(' ').length-1))*.25;
 }
 for(const [id,weight] of Object.entries(vector)){
  for(const neighbour of adjacentTopics[id]||[]) vector[neighbour]??=weight*.27;
 }
 return vector;
}
function searchTokens(value){
 return normalizeSearch(value).split(' ').filter(word=>word.length>1&&!stopWords.has(word));
}
const searchIndex=new Map(questions.map(q=>{
 const title=normalizeSearch(q.q);
 const support=q.ids.map(id=>answers[id].title).join(' ');
 return [q,{title,support:normalizeSearch(support),tokens:new Set(searchTokens(q.q+' '+support))}];
}));
function rankQuestions(candidates, value){
 const query=normalizeSearch(value);
 if(!query)return candidates;
 const concepts=queryConcepts(query);
 const tokens=searchTokens(query);
 return candidates.map((q,index)=>{
  const {title,support,tokens: indexedTokens}=searchIndex.get(q);
  const semantic=q.topics.reduce((score,id,i)=>score+(concepts[id]||0)*(i===0?5:i===1?2:1),0);
  const overlap=tokens.filter(token=>indexedTokens.has(token)).length/Math.max(tokens.length,1);
  const phrase=containsPhrase(title,query)?3:containsPhrase(support,query)?1:0;
  return {q,index,score:semantic+2.5*overlap+phrase};
 }).filter(row=>row.score>=.65).sort((a,b)=>b.score-a.score||a.index-b.index).map(row=>row.q);
}
