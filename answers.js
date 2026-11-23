const oralEditingPrompt = '把申请人文书里有辨识度的句子当底稿，例如 “I was proudest of the competitions” 和 “I can’t bring myself to leave it alone”。像对着镜头讲给一个人听：第一句回答问题，接着说发生了什么、你做了什么、结果怎样。用短一些的完整句和自然缩写，允许长短交替。删掉面试套话、形容词堆叠和泛泛的升华。长版增加一个具体决定、一项取舍或一个结果，别重复短版的结论。每个时长都能独立讲完。来自真实素材的稿子保留已知事实。练习虚构和假设题要标明。';
const answers = {};
function answer(id,title,kind,core,two,three,ending) {
 answers[id] = {title,kind,core,two,three,ending};
}
function scriptFor(id, seconds) {
 const a=answers[id];
 return [...a.core, ...(seconds>=120?a.two:[]), ...(seconds>=180?a.three:[]), a.ending];
}
answer('intro','自我介绍 · 从一个小问题开始','adapted',[
 "I’m the kind of person who opens a game for ten minutes and then spends half an hour looking up a road sign. I’ve played GeoGuessr since Grade 9. Sometimes I can tell a detail would give away a location, but I don’t know what that detail is called. I used to go through scattered guides looking for an explanation.",
 "Later, when I learned how text retrieval works, I thought about that problem again. I started exploring a tool where someone could describe a clue in Chinese or English and get notes with links to the original posts. The link matters to me. If two roads look alike, I want to see why a clue applies to one of them."
],[
 "I also ran school competitions for the game. That was a different kind of problem. I knew how to play, but I had forgotten how much a newcomer has to figure out in the first few rounds. Sharing tutorials gave them somewhere to start."
],[
 "My family would probably describe the same habit a little differently. They notice how often I stay at my computer when I get stuck on an algorithm or when I’m trying to finish a feature. What I’d like my friends to see is the thing I wanted to get working. For a college application game my team built, that was the campus tour. You could walk around and ask about the school. There was something fun about giving people a place to explore rather than explaining every part of the code."
], "That’s a fairly good picture of me. Once something gets my attention, I usually want to find out how it works and see what I can make with it.");
answer('tour','校园模拟游戏 · 接到反馈后的改动','adapted',[
 "Our instructor asked what people would learn from the college application game we were building. I’d been worrying about whether the code worked. I could show a player studying and earning points, but I didn’t have a good answer to the instructor’s question.",
 "I suggested campus tours. Players could walk around a virtual campus and ask characters questions based on information about the school. I wrote most of the code, and the tours were the part I put the most time into. They gave players a reason to explore a school even when it didn’t immediately improve their score.",
 "It’s still the first feature I’d show a friend. Someone can look around, ask a question, and see what I meant without hearing me explain the code."
],[
 "The suggestion also gave our three-person team a clearer decision to make. We could keep adding things for players to earn, or spend that time on a part of the game that answered the instructor’s concern. A campus tour was specific enough to build within the time we had."
],[
 "If I started again, I’d ask the team to describe what a player should remember after five minutes of playing. My own answer would be something like knowing what to ask on a campus visit. I’d show a small version of the tour to someone who hadn’t worked on the game. If they only remembered how many points they earned, I’d know I still had work to do. We didn’t run that test at the time. It’s what I’d like to do before getting too far into another project."
], "I still enjoy getting the code to run. On the next project I’d ask what the player gets out of it a little sooner.");
answer('reward','奖励设计 · 分数上升，选择变少','adapted',[
 "The result that surprised me came from a college application game I worked on. I explored a Q-learning event selector in simulation and compared it with a rule-based baseline. The learned policy earned more reward. Then I looked at its choices. It mostly picked studying and resting and barely chose paid work.",
 "I understood why the agent would do that. If those actions reliably produce a better score, it’s doing what the reward asks. But if I’m playing a game about making choices, I want to see paths other than the same study and rest loop. That result made me question my reward design.",
 "I’d keep the original baseline for the next comparison. I’d also count how often different actions are selected instead of only reporting how much reward they earn."
],[
 "I’d start with the same initial states for both policies. Then I could look at two players with different amounts of energy or different early choices and see whether the event selector actually responds to that. Comparing only the final averages would miss that difference."
],[
 "I wouldn’t assume that a perfectly even split between actions is the answer either. Sometimes studying is exactly what a player should do. I’d compare a few individual runs and look for situations where paid work would make sense, then see whether the policy ever takes that route. If it still doesn’t, I’d check what the simulation offers at that point and whether the reward values the trade-off I intended. With those comparisons I could say which change made the game more varied and what it cost."
], "The higher score was useful. Looking at the choices told me what it was useful for.");
answer('geo','地理线索 · 我可以聊很久的兴趣','adapted',[
 "I could talk about how people tell places apart in GeoGuessr for a long time. You get dropped on a road and sometimes the most useful thing is a sign everyone would walk past. I like figuring out which parts of it give anything away. It might be the shape of the sign, or the way it’s attached to a pole.",
 "The annoying part comes after the round. I want to know why the clue worked, but I don’t know the name of the thing I’m looking up. I used to go through separate guides hoping to find something that looked similar. That led me to explore a search tool. A player can describe a detail and look through notes in Chinese or English with links back to the sources."
],[
 "What I’d like the tool to help with is confusing clues. If two countries have roughly the same kind of road marker, telling me one country name doesn’t teach me much. Showing me where the notes agree and where they differ would be more useful."
],[
 "I also like that a game can turn into a completely different problem once you pay attention to it. I started by trying to get better at guessing. Then I found myself thinking about what makes an explanation useful and whether I could check it. There’s a simple way I’d compare two versions of the search. I’d hide the answer after a round, describe the clue the way a beginner might, and see whether either version gives me something I could use in the next round. That’s the part I’d keep coming back to."
], "There are endless details to get curious about. I still enjoy the moment when a little thing by the side of a road is enough to change my guess.");
answer('club','社团 · 新人参赛和交接','adapted',[
 "When I ran our school’s GeoGuessr club, the competitions were what I was proudest of. We opened them to younger and older students across both school divisions. At first I thought getting people to show up was the hard part. Once a few strong players kept winning, I could see why someone new might turn up interested and leave discouraged.",
 "I’d played for long enough that I didn’t remember how much there was to learn at the start. I collected online tutorials and put them in our group chat. People could go through the material between competitions without having to keep up with the fastest players in the room.",
 "Now that I have less time for the club, younger members still use the materials and organize activities themselves. I’m glad they have something to work from."
],[
 "Sharing a link was a small thing, but it changed what a newcomer had access to. A competition tells you how you did. Between rounds, a short explanation of one clue gives you something to try next time. I hadn’t made much room for that when I first organized the events."
],[
 "If I did it again, I’d leave some time at the beginning for an untimed round. A beginner could explain what they noticed and hear what a more experienced player would check next. I’d also ask the younger organizers which tutorials they actually use. They might choose a different order from mine, and that would be useful to know. The point of sharing the material was for them to be able to do something with it. I’d be happy if the next group changed the format to make it work better for the people who come now."
], "It’s good to see the club stay active as members come and go, even when I’m less involved.");
answer('bench','长曲棍球 · 替补与团队角色','adapted',[
 "I was disappointed when I found out I’d be a substitute in lacrosse. I’d gone to practice twice a week and wanted to start. My first thought was about whether the lineup reflected how hard I’d worked.",
 "Once I had to watch the game from the bench, I saw what the rotations actually did. A tired player comes off, and somebody has to know what’s happening before they step in. I started paying closer attention to the game so I could be ready when the team needed a change. I could be useful in that role, even though it wasn’t the one I’d hoped for.",
 "If it happened again, I’d still feel disappointed. I’d ask the coach earlier about what to watch for and what the team wanted from me when I came on."
],[
 "There was also something I could see from the bench that was harder to notice while playing. You can follow how a rotation affects several people at once. I had been thinking of the lineup as a decision about me, and watching how the game unfolded gave me more to go on."
],[
 "When I work on a team project, I sometimes have the same instinct. I want to do the part I’m most excited about, so it can take a moment to notice what someone else needs me to do first. It’s easier for me to adjust when the role is specific. If I know what to look for and when to step in, I don’t have to spend the whole time wondering whether I’m contributing. I still want to get better at my own game, but I understand why being ready matters to everybody else."
], "I wanted a starting spot. What I got was a better understanding of why the team needed good substitutes too.");
answer('orbit','策略竞赛 · 写死的规则遇到更强对手','adapted',[
 "In a strategy game competition, I went in thinking I could handle most situations by writing enough rules. If an opponent attacked, my program had a response. I’d seen it do well enough that I felt pretty good about adding more rules in the same way.",
 "Against stronger opponents, the limits were obvious. I could patch a situation I’d already seen. I had a much harder time thinking of the next situation where the patch would fail. I’d been putting effort into making one kind of approach more complicated, and I wanted to know what other kinds of approaches could do.",
 "I got more interested in how programs learn from examples and tried to learn some of the basics through preparation for an AI competition."
],[
 "When I went back to thinking about the game, the comparison I cared about had changed. I still wanted to know which approach scored better, but I also wanted to know which one could handle a situation I hadn’t thought to write a rule for."
],[
 "I’d set up a fairer comparison if I picked the project up again. I’d keep the rule-based version, put both versions in the same set of games, and save a few matches where each one struggles. Looking only at a winning rate won’t tell me whether an approach is getting stuck in one situation or making small mistakes throughout. Sometimes a rule is easy to explain and works fine. I would keep it if the evidence supported it. What I’d stop doing is assuming that a growing list of exceptions is proof that I’m getting closer to the right answer."
], "I was frustrated when I lost. It was also the first time I really wanted to understand what the stronger approaches were doing.");
answer('engineering','为什么读计算机工程','adapted',[
 "What interests me about computer engineering is the point where I can see what a design decision actually does. I first noticed that while working on a college application game. We had a version that ran, and our instructor asked what somebody would learn from playing it. I proposed campus tours because I wanted a player to be able to explore a school and ask a question about it.",
 "Later I worked with an event selector in simulation. It got a better reward score than a rule-based baseline, but it almost never chose one of the actions. I liked trying to work out why. Part of the answer was in the objective we had given it, which was something we could change and test.",
 "That’s the work I want to get better at: building a system and figuring out how its choices affect what someone actually sees."
],[
 "There’s a gap between making a demo work and understanding it well enough to change it with confidence. I’d like to study the mathematics behind learning methods and also learn more about the systems that have to run them."
],[
 "What I’d like from an engineering project is a chance to follow a decision all the way through. Suppose I want a tool to respond faster. I’d want to find out what is slowing it down, decide what can be simplified, and test whether the new version is still useful. The answer might involve an algorithm choice, or it might involve how data moves through the system. I’m interested in learning enough about both to know where to start. I like the moment when a vague complaint, like a feature feeling slow, becomes something I can measure and investigate."
], "I’m excited to get better at that cycle and to build things that other people can actually use.");
answer('mentor','主动求助 · 从文本检索课到实践','adapted',[
 "I asked for help learning how text retrieval works during a summer course. I’d heard the term before, but I had a hard time picturing what went in and what came out. My teacher introduced the basics and some places where people use it. The example I kept thinking about afterwards was one I knew from playing GeoGuessr.",
 "If I see a road sign I can describe but can’t name, I might be unable to find the right guide. A search system needs a way to match my description to what someone else wrote. Having the original link also matters to me, because I can go back and see whether the explanation fits what I saw.",
 "Connecting the course material to that problem made me keep working with it after the course ended."
],[
 "It helped me see two separate places to look when a result seems wrong. Maybe the search found the wrong notes, or maybe the system used the notes badly. I’d first check what came back from the search before I tried to fix the entire answer."
],[
 "A test I’d like to run is to give the tool two descriptions of the same object, one in each language. Then I’d look at the notes it retrieves and compare whether they explain the same clue. I wouldn’t need a big benchmark to start. Even a few examples where a beginner uses ordinary words could show where the system is confusing similar things. It’s easier for me to ask a useful question about a method when I can point to one case where I want to see it work."
], "I seem to stay with technical questions longer when they connect to something I already enjoy.");
answer('iyp','物理竞赛 · 两组读数不一致','fiction',[
 "In a practice Physics Fight, two groups brought in curves that looked completely different for the same setup. Both groups thought the other one had made a mistake. I asked each group to show us one raw video and point to exactly where they started measuring.",
 "One group started its clock when the object was released. The other started when it crossed a mark further down the track. From then on, they were talking about different chunks of the motion. We agreed to mark the same point in each video and draw the curves again. The difference got smaller. There was still a gap, which was the part we could actually discuss.",
 "After that I asked the group presenting to say which frame they called time zero before they showed the graph. That saved us from having the same argument twice."
],[
 "I didn’t want to throw away either set of results. The original curves were still evidence of what each group had measured. Putting both versions next to one another helped us explain why they had looked incompatible instead of asking people to trust the corrected version."
],[
 "I’d do the same kind of check when judging an engineering design. Before arguing about whose prototype is faster or more accurate, I’d ask whether both teams tested the same thing. If they didn’t, I’d agree on one small test we could repeat, with the starting condition and the measurement written down. If the gap stays after that, then it’s worth spending time on the design itself. That’s the part I like about these discussions. An apparent disagreement can give you a better question than the one you started with."
], "I came away feeling that asking someone to show their measurement can be a better contribution than immediately telling them what’s wrong with their model.");
answer('math','算法练习 · 找到失败的最小例子','fiction',[
 "I was practicing a programming problem and thought my fast solution was finished because it passed the samples. Then I tried a few inputs with repeated values, and I couldn’t tell from the output what was going wrong. I wrote a slower version that checked every possibility. It was only usable on small inputs, but that was enough.",
 "The two versions disagreed on an input of five items. I kept removing items until I found a case with just two that still failed. My fast version had assumed that a tie couldn’t happen. Once I could read the whole example without scrolling, I saw the exact line to change.",
 "After the fix, I ran both versions again on small random inputs. Then I returned to the larger inputs to check that I hadn’t lost the speed that made the rewrite worthwhile."
],[
 "It would have been easy to add a special case for the five items. The smallest counterexample was more helpful because it gave me a reason why the answer was wrong. That made it easier to tell whether the fix would hold on the next case."
],[
 "I can think of situations where I’d use that technique outside of a contest. If a model gives an odd answer, for example, I’d want to remove anything I can from the example and see which part still causes the problem. Then I’d test what should change when I edit just that part. I don’t expect to explain every failure that way, but it keeps me from changing five things at once and guessing which one made it better. I used to take a passing sample as a cue to move on. I’m a little more suspicious of it now."
], "I still want a fast solution. I also want a small test that would show me if it were wrong.");
answer('audio','音乐滤镜 · 创意和试听','fiction',[
 "One creative thing I’ve worked on is a browser audio filter. I like shoegaze, and I wanted to see if I could change how a guitar sounded using a few controls. In this practice story, I played the before and after to a friend. The first thing they noticed was that the second clip was louder. I was hoping they’d notice the way the sound lingered.",
 "So I turned the output down until the two clips sounded about the same volume. Then I changed one setting at a time. It was easier to hear the effect once I could play the same short clip back to back. I kept the controls that made a difference I could describe.",
 "I liked that someone could understand what I’d made just by trying it. I didn’t have to talk them through the code first."
],[
 "One thing I would change about the first version is the order in which I built it. I started with a few controls and hoped they would add up to the sound I wanted. Starting with one clip and adding controls as I could hear a reason for them would have made comparisons simpler."
],[
 "The friend’s comment also made me pay attention to how I present a test. If I show somebody two clips and tell them which one I spent longer on, they already know what I want them to say. I’d rather give someone two versions, ask what they hear, and let them tell me if the difference matters. I don’t have to agree with every taste judgement. If they can’t hear the change I intended, though, there’s a fair chance the controls or the effect need more work."
], "Getting a filter to run was satisfying. Hearing a difference I actually wanted was the part that made me keep working on it.");
answer('team','团队分歧 · 诚实反馈和道歉','fiction',[
 "In a practice scenario, my teammate showed me a design for a small game. I was worried about the deadline and said we should cut it before she’d finished explaining it. The room went quiet. Later, I realized I’d treated the idea as extra work without asking what problem she was trying to solve.",
 "I went back to her and said I’d cut her off. I asked her to show me the part she thought we needed. It turned out she cared about new users getting stuck at the first screen. We agreed to try one small change there and save the bigger redesign for later.",
 "We still had a deadline, and she still had a say in what went into the demo. I would ask about the reason for a design first if I were in that situation again."
],[
 "I felt embarrassed apologizing, especially because I still thought we had too little time. Saying that both things were true made it easier. I could own how I spoke without pretending the deadline had disappeared. She could explain her idea without having to defend every part of it."
],[
 "The next check-in would be a good time to see whether the change worked. I’d let someone new try the first screen and watch whether they find the button without our help. That would give the team something more useful to talk about than who had won the argument. I’d also make a note of the bigger idea and who suggested it. It bothered me that my first response could make someone think the easiest way to work with me was to stop bringing things up. I’d want them to see that I can come back to a decision and listen."
], "I don’t think a good team has to agree at once. It helps when people feel they can finish explaining why they disagree.");
answer('lead','好队长和好队员 · 把信息带回团队','adapted',[
 "A good leader gives people enough information to make decisions without waiting for permission every time. A good team member tells the group what they’re seeing, including when something seems harder than the leader expected.",
 "I learned a bit about that in our GeoGuessr club. I was pleased that we were running competitions open to the whole school. But a few players were so strong that beginners could turn up interested and leave feeling they didn’t belong. I started sharing the tutorials I used so there was something people could work through between events.",
 "Younger members still use those materials and have organized activities themselves. Someone who spots where a beginner gets lost might understand that problem better than I do now. I’d want them to be able to run an event their way."
],[
 "On a team project, that can be as simple as sharing one clear next step, saying who owns it, and telling others why it matters. If the person doing the work notices a problem, they need space to say so while the plan can still change."
],[
 "A team can have people who care about different things. One person might want a hard competition. Another might want to give beginners a way into it. They can work together if they agree on which part of the event is for which group and if they don’t quietly change the plan on each other. I’d want the leader to make that agreement easy to understand. I’d want the team member to say if the agreement is failing in practice, even if they weren’t the one who set it. That’s useful feedback for whoever has to organize the next event."
], "The way I’d tell whether I’d led well is by seeing what other people can do after I step back.");
answer('integrity','诚信 · 把失败的那条结果讲清楚','fiction',[
 "Integrity to me is making sure somebody can understand what actually happened, even when one part of it looks bad. In a practice scenario, a teammate wanted to leave a failed test out of a project demo. It was the only time the tool had frozen, and we didn’t have much time to figure out why.",
 "I said we could still show the working case, but we should describe the test that failed. We wrote down what we’d tried, what caused the freeze as far as we knew, and what we hadn’t checked yet. We could say the basic flow worked. We couldn’t say it worked for every input.",
 "That gave us a claim we could actually stand behind. It also left the next person with something concrete to try, instead of having to rediscover the same bug."
],[
 "If the teammate worried the result would dominate the presentation, I’d suggest putting it in one short limitations slide rather than giving it half our time. People can understand a working demo and one unresolved problem in the same presentation."
],[
 "The timing matters. If the bug is minor, it’s enough to describe it clearly and set a next test. If it could change a decision someone is making with the tool, I’d pause its use and explain what we found to whoever depends on it. I’d also try to say exactly what I know. It’s easy to make the failure sound more serious than it is, or to explain it away when we haven’t checked. Someone else should be able to read our notes, reproduce the result, and decide for themselves whether the limitation changes what they’d do."
], "For me it comes down to whether someone can trust what I’ve said after they see the whole test.");
answer('time','质量与截止 · 准时交一个可用版本','scenario',[
 "I’d normally deliver a solid version on time. A deadline often belongs to other people too. Someone may need to give feedback, present the work, or build their part on top of it. If I wait until my version looks perfect, they might lose the time they had set aside.",
 "Say my team is one hour from a demo and a feature keeps crashing. I’d check whether the audience needs that feature to understand the work. If it’s extra, I’d leave it out of the demo and tell the team what’s missing. If it’s central, I’d spend the hour testing a smaller version we can reliably show. I’d give the team enough notice to change the presentation.",
 "There are times I’d ask for an extension. If the work could mislead somebody or cause damage, I’d explain that before the deadline and agree on a new plan."
],[
 "The important distinction is what quality is missing. A rough-looking button can usually wait. An incorrect calculation that someone will use afterwards can’t. If I tell the team which one we’re dealing with, we have a better shot at making the decision together."
],[
 "I’d also try to avoid making the same choice at the last minute next time. A short check-in the day before the demo would let us decide what has to be there and what can be left until later. If the team can open the simplest version and finish the main task once, we have something to build on. Then we can spend the remaining time improving it. If we discover that the main task doesn’t work at that point, we can still talk to whoever is expecting it before they’re waiting for our submission."
], "So my first choice is to keep the deadline and reduce the scope. If I can’t deliver something people can use safely, I’d make that clear while there’s still time to respond.");
answer('event','活动创意 · 小预算帮助新生交朋友','scenario',[
 "I’d use the budget for a short drop-in activity during lunch. The people who already know someone are more likely to come to a big welcome event. I’d try to make it comfortable to walk in alone and have something to do straight away.",
 "My first version would be a fifteen-minute campus clue game. At the door, a volunteer would put students in groups of three or four. They’d get a few photos of familiar places around school and try to work out where they were taken. The clues would be easy enough for a new student to offer a guess. I’d spend most of the money on printing and a few shared snacks.",
 "Afterwards, I’d count how many came alone and ask anonymously whether they spoke to someone new. If people liked the game but felt awkward when they arrived, I’d improve the welcome before spending more."
],[
 "I’d ask one volunteer to stay near the door. I ran school competitions where getting in was technically open to everybody, but walking into a room full of confident players could still feel intimidating. I’d want someone to notice a student hanging back."
],[
 "I’d try it once before committing to a whole series. If lunch is busy and few people stay for the full activity, I’d make the next version shorter or offer two start times. If the same group comes back and nobody new feels comfortable joining, I’d ask where people heard about it and test an announcement in a different part of the school. I like this idea because it’s cheap to change. I don’t have to defend a big program just because we paid for it. I can keep the part students actually enjoy and change the rest."
], "I’d call the first session a success if people who walked in alone had a reason to come back with someone they’d just met.");
answer('queue','工程设计 · 午休排队的瓶颈','scenario',[
 "I’d spend one lunch watching where the line actually slows down. There are a few different steps. People choose what they want, pay, and collect food. A long queue at the entrance doesn’t tell me which part is overloaded. I’d ask the staff how orders work and time a few people through each step.",
 "Suppose it turns out that students spend a lot of time deciding what to buy at the counter. I’d try putting a list of the available meals where they can see it while they wait. That’s cheap and the cafeteria can undo it the next day. If pickup is the problem, I’d test separating students waiting for food from those ready to order.",
 "I’d compare waiting times on similar days. I’d also check whether a new line blocks the door or makes it harder for somebody who can’t move through the space quickly."
],[
 "I would track the longer waits too. An average can go down even if a few students can no longer get back to class on time. I’d keep a rough count of people who walk away or reach the counter after the rush."
],[
 "I’d talk through the result with staff before deciding whether to keep the change. They could see work I missed, like a pickup area that needs constant attention or a sign that has to be updated too often. If their workload goes way up, that may be a good reason to try something simpler. I also wouldn’t run the test on a day with an unusual menu and assume it proves the plan. I’d record what was being served, how many people came during the busiest ten minutes, and what we changed. Then another person could repeat it."
], "I’d keep the smallest change that makes the wait more predictable and is practical for the people working there.");
answer('estimate','数量估算 · 安省学校有多少','scenario',[
 "I’d first decide which schools count, because that can change the estimate a lot. For example, I could start with elementary and secondary schools, then decide whether private schools and schools with both age groups are counted separately. I’d aim for a range.",
 "I’d estimate how many school-age students there are and divide them by typical enrolment. I’d split elementary and secondary students first. If I assume roughly a million elementary students and about four hundred students at a typical school, that gives about twenty-five hundred elementary schools. I’d do a separate calculation for secondary schools because those buildings tend to hold more students. The numbers are assumptions for illustration.",
 "I’d check the results by taking a couple of districts whose student numbers and number of schools are known. If my assumed school size is way off, I’d adjust it."
],[
 "I’d also split urban and rural areas if I had the data. The provincial average can be misleading when one large school and several small schools serve the same number of students. The rural calculation may contribute more schools than the population share suggests."
],[
 "The three numbers I’d most want are the population in each grade range, the number of students enrolled in each school system, and the typical school size in different areas. Those numbers do different jobs. The first gives me the base population. The second helps me account for students who are in schools outside the group I’m counting. The third turns enrolled students into a number of buildings. I’d run a low and high case for typical school size because that assumption is easy to change and will move the result noticeably. If both estimates agree within a useful range, I’d stop there until someone needs a more exact count."
], "I’d give the estimate with the school definition and the assumptions attached, so someone could tell whether it fits the question they’re asking.");
answer('roleModel','榜样 · 把难题问得小一点','adapted',[
 "A teacher I worked with over the summer changed the way I ask for help. I was learning how to build a text retrieval system. There was a lot I wanted to understand at once, and it was easy to go straight to the part where a model produces an answer.",
 "What stayed with me was how useful it was to understand the steps before that. The system takes a question, looks for relevant passages and gives those passages to the model. Once I understood that, I had something specific to check for my geography project. If I describe the shape of a sign and the system finds notes about the colour, I can go look at those notes. I have a much better question than just asking why the whole thing doesn’t work."
],[
 "I use that approach when I get stuck now. I try to bring a small example when I ask somebody for help. It gives them something they can actually respond to, and occasionally I see the issue myself while getting the example ready."
],[
 "I also appreciate that the teacher let the subject stay useful beyond the course. I was able to take an idea I had learned with text and use it for a hobby where I had a problem of my own. It was a good reminder of how much difference a clear example can make. When I share a tutorial or explain something to someone else, I try to give them one thing they can try right away. They can always ask me about the next part after they’ve had a go."
], "That teacher made a big subject feel like a series of questions I could actually answer. I want to be able to do that for other people too.");
answer('repair','关系修复 · 随口一句话的后果','fiction',[
 "I made a joke about a friend being quiet during a group presentation. It got a laugh, and I moved on. Later I thought about how much work they’d done on the slides and how I’d made them sound like someone who hadn’t contributed.",
 "I messaged them privately. I said I was sorry I’d joked about their part of the presentation and that I could see how it made their work look. I let them tell me how it landed. They said it bothered them that the rest of the group heard it. The next time we discussed the project, I mentioned that they had put together the slides and caught a mistake in our figures. Both things were true, and I should have said so earlier."
],[
 "I also stopped filling the silence by making a joke when someone was taking time to answer. In our next presentation, we checked who wanted to speak about which part before we went in. My friend chose to explain the figures."
],[
 "I was a little nervous that bringing it up again would make things awkward. I asked my friend beforehand whether saying something in the group would help. They wanted the group to recognize what they’d done, and they were happy for me to say it. I’m glad I asked. I had already made one decision about them in public without giving it much thought. I wanted them to have a say in what happened next."
], "We got back to talking normally, and I’ve become more careful about what a throwaway joke can make other people believe.");
answer('shared','团队价值观 · 同意怎样处理坏消息','fiction',[
 "I think there are a few things a team needs to agree on. I’d start with what we do when someone finds a problem close to the deadline. I’d want everybody to feel they can bring it up, and I’d want us to be honest about it when we present the work.",
 "On a class project, one teammate wanted time for more testing and another cared a lot about making our demo easy to follow. Both concerns made sense. While we rehearsed, a part of the demo failed. We decided to show the version we had tested, tell the audience what was still unreliable, and use the time left to make the working example clearer. Once we agreed what we’d say about the failure, it was easier to choose what to do with the time."
],[
 "I’d make that agreement early if I had another team project. A question I like is, if something stops working the night before we submit, who needs to know and when? I’d want the person who notices it to speak up even if they can’t fix it."
],[
 "There are plenty of preferences I’d leave open. Someone may like finishing a rough version quickly, and someone else may want to spend an afternoon checking the awkward cases. I’d give both people something useful to do. A disagreement about the pace can help us spot a deadline we’re about to miss. It gets harder if people are embarrassed to admit that they need help, because then we’ve lost the information that would let us change plans. I’d pay attention to whether people still bring up problems after the first one."
], "So I’d agree on how we’ll treat each other and what we’ll be honest about. We can work out most of the other differences as we go.");
answer('persuade','说服队友 · 先比较两种演示','fiction',[
 "In a class project, I wanted to start our demo with a short example. A teammate wanted to explain the setup first because they’d spent a lot of time getting it to work and worried the audience wouldn’t understand it. I kept trying to explain why a faster opening would be better, and that got us nowhere.",
 "I asked if we could run both openings for someone who hadn’t seen the project. We kept the demo length the same and asked that person to tell us what the project did after each opening. They got the idea sooner with the example, though they still had a question about what the program assumed. We opened with the example and had my teammate explain that assumption right after it. Their concern made the final demo clearer."
],[
 "We picked the demo we could finish rehearsing, which mattered that afternoon. I also asked my teammate if they wanted to handle the transition. It ended up being the part of the demo where the audience understood why the setup mattered."
],[
 "If I ran that comparison again, I’d ask different people to watch the two openings. The second version has an advantage when the person already knows what they’re looking at. With our schedule, the quick comparison still gave us something to discuss. I’d also ask earlier what the person wants the audience to remember. We had spent most of our disagreement talking about the order of the slides, and the real concern was whether people would understand a piece of work they were proud of."
], "The quickest way forward was to understand their concern well enough to test it. Then we both had a reason to change the plan.");
answer('responsibility','责任 · 后来的成员还能参加','adapted',[
 "The responsibility I cared most about as club president was making sure a beginner could play before they knew very much about the game. I organized GeoGuessr competitions for middle and high school students from different parts of my school. I was proud that we got them into the same competition.",
 "Some players were much stronger than everyone else. I’d played for years, and I’d forgotten how many clues you have to learn before a round starts to make sense. I collected tutorials and put the links in our group chat. That gave students a way to look up a clue after a difficult round, and they could try again between competitions."
],[
 "I’ve had less time for the club in Grade 12. Some younger students who came in as beginners still use those tutorials and now organize activities themselves. I care about that because things are still happening when I’m busy doing something else."
],[
 "There are things I would change if I were running those early competitions again. I’d give beginners time to talk through a couple of rounds before we keep score. A student might make a good observation and still guess the wrong country. Hearing which part of their reasoning worked would give them something to use in the next round. I’d also let younger members run some of those practices while I was still there to help with the practical things. They would have more say in how the club runs, and we could work out the awkward bits together."
], "For me the responsibility was to set up something other students could use. I’m glad they’re still deciding what to do with it.");
answer('friend','帮助朋友 · 陪他把第一步做完','fiction',[
 "A friend in a project group went quiet for a couple of days. We were waiting for their slides, and my first reaction was to send a reminder in the chat. I checked in privately instead. They’d fallen behind in a few classes and didn’t know where to start on our part.",
 "I asked if it would help to sit together for twenty minutes and work on the first slide. We started by picking the figure that explained their result. They told me what the figure meant while I wrote down a few words. They used those notes to finish the slide themselves. We also agreed on what we could tell the group about our schedule. That let the rest of us move a rehearsal without sharing anything private."
],[
 "I checked in the next day and asked whether they wanted help again. They said they could finish the last slide. I left that with them and told the group we could practise together after school."
],[
 "I could have made the slides myself in the time we spent together. I was tempted, because I worried about finishing. I’m glad I asked them first. They knew the result much better than I did, and the way they explained it during rehearsal made that pretty obvious. If they had wanted some space, I would have asked whether I could help with a smaller part of the workload and let them decide. It mattered that they still had a choice about what we did and who we told."
], "We finished the presentation together. I learned that sometimes the useful thing is to make a task small enough for someone to start.");
answer('culture','跨文化交流 · 把留给别人的时间算进去','fiction',[
 "I learned something about group discussions while working with students who had gone to school in different countries. I was used to jumping in as soon as I thought of something. One student told me that in their previous classes they were expected to listen to the speaker and wait before offering a different view. They’d come away from our discussion thinking I didn’t want to hear what they had to say.",
 "At the next meeting I sent the main question beforehand. Once I had shared my idea, I stopped talking for a moment and waited. That student brought up a problem I hadn’t considered. Another person added a point in the group chat later, and we changed the plan before we started."
],[
 "It made me pay attention to whose ideas are showing up in meetings. I now like to leave people a chance to think, especially if a question is new. When we decide something quickly, I ask whether anyone wants to add a comment later."
],[
 "I only know how that student described their own classroom. I’d be making a big assumption if I expected everyone from their country to behave in the same way. What I can carry with me is the conversation about how we each thought we were being polite. I thought I was showing enthusiasm, and they thought they were giving people room to talk. A small change to our discussions let both habits fit. I think about that now whenever I join a group and find myself assuming at once that a quiet person has nothing to add."
], "I still like a quick discussion. I’ve learned to leave a bit more space in it.");
answer('travel','旅行 · 把街景放回到真实的地方','scenario',[
 "I’d like to go to Japan and spend a few days travelling around by local train. I’ve seen plenty of Japanese roads in GeoGuessr. It would be fun to visit one of the smaller towns I’d normally see for a few seconds and then leave when the round ends.",
 "I’d pick a station outside a big city and walk around with no route planned for an hour or two. In the game I’m looking at road signs and poles because they help me guess a country. On that walk I’d be curious about what the signs actually help a person do, where people stop on the way home and how easy it is to get around if you don’t know the area. I’d probably also spend too much time figuring out which local food to try."
],[
 "I’d take notes for myself, especially when the way I imagined a town from the road turned out to be wrong. I’d like to see how much I miss when I pay attention only to details that get me points."
],[
 "A trip like that also gives me an excuse to learn a little of the language before going. I’d want enough to order something, ask which train goes where and thank somebody for their help. If I had more time, I’d make the same kind of trip in another part of the country and compare what was easy and what I found confusing. The two visits might teach me different things even if the places look similar at first in the game."
], "I spend enough time looking at places on a screen. This would be a nice way to slow down and actually look around.");
answer('school','好学校 · 学生遇到难处时能往前走','scenario',[
 "I’d judge a school partly by what happens when a student wants to try something they aren’t good at yet. I’d look for a place where they can ask a basic question, find time to practise and meet somebody a little further along who will give them an honest answer.",
 "I saw why that matters when I ran GeoGuessr competitions. Bringing students from different grades into the same room was the easy part. A beginner could spend the whole round trying to work out what everybody was looking at. Sharing tutorials gave those students a place to start, and some younger members now run activities of their own. I’d look for the same kind of path into other things a school offers, from a workshop to a team."
],[
 "If I were visiting a school, I’d ask a student about the last time they were stuck on something. I’d be interested in who they approached and whether they still felt welcome when they came back with a second question."
],[
 "I’d also look at what happens to a good student project when its organizers graduate. Is there someone who knows where the kit is, how to book a room or which teacher to ask? Those details are easy to miss from a tour. They can determine whether the next group gets to spend its time actually learning the activity or starts over with the paperwork. I’d ask students who joined recently about that, since somebody who has already spent three years at the school may have forgotten how long it took to find things."
], "A good school makes it possible for someone to start out unsure and eventually become the person another student goes to for help.");
