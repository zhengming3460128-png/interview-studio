const groups = ['项目与动机','反馈与挫折','团队与分歧','社区与公平','价值与判断','设计与创意'];
const questions = [];
const questionSources = {
 sauder24: 'https://www.reddit.com/r/ubcsauder/comments/1h3zii1/sauder_interview_questions/',
 sauder23: 'https://www.reddit.com/r/ubcsauder/comments/188ke8b/',
 sauderCulture: 'https://www.reddit.com/r/BCGrade12s/comments/1p2joti/first_year_at_sauder_ask_away/',
 sauderTeam: 'https://www.reddit.com/r/ubcsauder/comments/1hutn07/tips_for_the_interview/',
 sauderIntegrity: 'https://www.reddit.com/r/BCGrade12s/comments/1p2udpz/first_year_at_sauder_ama/',
 sauderEarlier: 'https://www.reddit.com/r/ubcsauder/comments/q0wywb/ubc_sauder_2022_fall_application/',
 toronto26: 'https://www.reddit.com/r/OntarioGrade12s/comments/1q0kn5y/uoft_eng_interview/',
 torontoWhy: 'https://www.reddit.com/r/UofT/comments/1p6uph9/my_daughter_is_applying_to_uoft_engineering_we/',
 torontoPractice: 'https://www.reddit.com/r/OntarioGrade12s/comments/18pli9j/just_did_the_uoft_eng_interview/',
 torontoCareer: 'https://www.studentlife.utoronto.ca/wp-content/uploads/Interview-Techniques-Guide-1.pdf'
};
function question(school,group,q,ids,topics,{source='practice',link,kind='story'}={}){
 questions.push({school,group,q,ids:ids.split(' '),topics:topics.split(' '),source,url:questionSources[link],kind});
}
function practice(school,group,rows,kind='story'){
 for(const [q,ids,topics] of rows) question(school,group,q,ids,topics,{kind});
}
function recalled(school,group,link,rows,kind='story'){
 for(const [q,ids,topics] of rows) question(school,group,q,ids,topics,{source:'recalled',link,kind});
}
practice('both',0,[
 ['Introduce yourself. What is something about you that we would not learn from your grades?','intro','intro personality interest'],
 ['What part of your personality shows up most clearly in the things you build?','intro geo','personality intro technical'],
 ['Tell us about a project you would show a friend first, and why.','tour','technical creativity interest'],
 ['What small problem made you curious enough to investigate it?','geo','interest technical'],
 ['Tell us about something you taught yourself outside class. How did you apply it?','mentor geo','learning technical initiative']
]);
practice('ut',0,[
 ['Why are you interested in computer engineering? What would you like to learn?','engineering','motivation technical'],
 ['Tell us about a technical result you kept thinking about after the project ended.','reward','technical curiosity testing'],
 ['How has one of your projects changed what you want from an engineering education?','engineering orbit','motivation learning setback']
]);
practice('both',1,[
 ['Tell us about a time your first approach stopped working. What did you change?','orbit','setback learning technical'],
 ['Describe feedback that made you rethink a decision.','tour audio','feedback creativity learning'],
 ['When did a result contradict what you expected?','reward math','testing setback technical'],
 ['Tell us about a time when asking for help moved your work forward.','mentor','feedback learning teamwork'],
 ['How have you checked whether something you built actually worked?','math audio','testing technical'],
 ['Tell us about a mistake you understand differently now.','orbit team','setback learning feedback']
]);
practice('both',2,[
 ['Tell us about a contribution to a team that you are proud of.','tour bench','teamwork technical leadership'],
 ['Describe a time someone else’s perspective changed what you did.','tour team','teamwork conflict feedback'],
 ['What did you do when the role you were given differed from the one you wanted?','bench','role setback teamwork'],
 ['Tell us how you got a team moving again after a disagreement.','team','conflict teamwork empathy'],
 ['Describe a time you took responsibility for helping a group keep going.','club','responsibility leadership teamwork']
]);
practice('both',3,[
 ['Tell us about a time you noticed someone having trouble joining in.','club','inclusion empathy community'],
 ['Tell us about an activity that continued after you stepped back. What made that possible?','club','community leadership responsibility'],
 ['How can someone contribute without being the most visible person on a team?','bench','role teamwork responsibility']
]);
practice('both',4,[
 ['Your teammate wants to leave out a result that makes your project look weaker. How would you respond?','integrity','integrity teamwork conflict'],
 ['When can a useful metric give the wrong impression? How would you check?','reward','testing tradeoff technical'],
 ['An optional feature might make your team miss the deadline. How would you decide what to ship?','time','deadline tradeoff design']
],'case');
practice('ut',5,[
 ['The school cafeteria is crowded at lunch. What data would you collect, and what small change would you test?','queue','design testing tradeoff'],
 ['How would you estimate the number of schools in a province if you could use only a few measurements?','estimate','estimate testing design'],
 ['Two groups get different readings from a sensor. How would you isolate the cause?','iyp','testing design technical'],
 ['Your team has too much to demo and five minutes to present. How would you decide what to show?','time','tradeoff design deadline']
],'case');
practice('ubc',5,[
 ['You have a small budget to help new students meet people. Pitch something you could try next week.','event','design inclusion community'],
 ['Design a practical service for students who have just ten minutes to get lunch.','queue','design community tradeoff'],
 ['You inherit a club with few sign-ups. What would you try in the first week?','event','design community leadership'],
 ['Your club has a small room and more students than it can fit. How could you give newcomers a fair chance to join?','event','inclusion design tradeoff']
],'case');
recalled('ubc',0,'sauder24',[
 ['What is a topic you could talk about for a long time? Tell us why.','geo','interest personality intro']
]);
recalled('ubc',0,'sauder23',[
 ['What is the most creative thing you have done?','audio tour','creativity technical'],
 ['Who has been a positive influence on you?','roleModel','role motivation learning']
]);
recalled('ubc',1,'sauder24',[
 ['Tell us about a project you initially misunderstood and how you got back on track.','tour','feedback setback teamwork']
]);
recalled('ubc',2,'sauder24',[
 ['What qualities would you look for in a leader and in a team member?','lead','leadership role teamwork'],
 ['Describe how you repaired a relationship after realizing you hurt someone close to you.','repair','empathy conflict responsibility']
]);
recalled('ubc',2,'sauderTeam',[
 ['Do people on a team need to share the same values? Explain.','shared','teamwork integrity conflict'],
 ['How did you get someone to consider an idea they initially opposed?','persuade','persuasion conflict teamwork'],
 ['What does responsible leadership look like in your day-to-day life?','responsibility','leadership responsibility community']
]);
recalled('ubc',2,'sauderEarlier',[
 ['Tell us about a disagreement with a peer. What did you do, and how did it end?','team','conflict teamwork empathy']
]);
recalled('ubc',3,'sauder24',[
 ['When have you helped someone who needed support? What difference did it make?','friend club','empathy community inclusion']
]);
recalled('ubc',3,'sauderEarlier',[
 ['Describe how you supported a friend through a difficult time.','friend','empathy responsibility teamwork']
]);
recalled('ubc',3,'sauderCulture',[
 ['Tell us something you learned about another culture and how you use it in your life.','culture','culture learning empathy'],
 ['How have you made a contribution to your community?','club','community leadership inclusion']
]);
recalled('ubc',4,'sauderIntegrity',[
 ['What does integrity mean to you? Describe a time you acted on it.','integrity','integrity responsibility'],
 ['What is a responsibility that matters to you, and why?','responsibility','responsibility personality leadership']
]);
recalled('ubc',4,'sauder24',[
 ['Would you submit decent work on time or take longer to make it better?','time','deadline tradeoff responsibility']
],'case');
recalled('ubc',4,'sauderEarlier',[
 ['If you could travel anywhere, where would you go and what would you do there?','travel','travel interest personality']
]);
recalled('ut',0,'toronto26',[
 ['Why did you choose engineering? How did an earlier experience influence that choice?','engineering','motivation technical learning']
]);
recalled('ut',0,'torontoWhy',[
 ['What do you hope to do in the future, and how would studying engineering help?','engineering','motivation technical personality']
]);
recalled('ut',4,'toronto26',[
 ['What qualities make a school good, in your view?','school','inclusion community design']
]);
question('ut',5,'What information would you need to estimate the number of schools in Ontario?','estimate','estimate testing design',{source:'public-practice',link:'torontoPractice',kind:'case'});
question('ut',2,'Tell us about a challenge you encountered while working on a team. How did you deal with it?','team tour','conflict teamwork setback',{source:'official-practice',link:'torontoCareer'});
