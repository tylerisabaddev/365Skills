// 365 skills — name, category. Details (description/howto/resources) are
// generated from category templates with skill-specific overrides for some.
const SKILLS = [
  [1,"Whistling","Performance"],[2,"Juggling (3 balls)","Physical"],[3,"Rubik's cube","Mind"],
  [4,"Chinese yo-yo","Performance"],[5,"Back lever progression","Physical"],[6,"Feynman learning technique","Mind"],
  [7,"Origami crane","Creative"],[8,"Candy making basics","Culinary"],[9,"Write a web scraper","Tech"],
  [10,"Moonwalk dance move","Performance"],[11,"Handstand against wall","Physical"],[12,"Mental multiplication tricks","Mind"],
  [13,"Watercolor basics","Creative"],[14,"Bake sourdough bread","Culinary"],[15,"API calls with fetch","Tech"],
  [16,"Songwriting structure","Music"],[17,"Jump rope tricks","Physical"],[18,"Chess opening principles","Mind"],
  [19,"Paper cutting art","Creative"],[20,"Make fresh pasta","Culinary"],[21,"Web accessibility basics","Tech"],
  [22,"Harmonica basics","Music"],[23,"Handstand (freestanding)","Physical"],[24,"Speed mental math","Mind"],
  [25,"Calligraphy basics","Creative"],[26,"Sushi rolling","Culinary"],[27,"Learn Markdown","Tech"],
  [28,"Music theory intervals","Music"],[29,"Backward somersault","Physical"],[30,"Memory palace technique","Mind"],
  [31,"Paper marbling","Creative"],[32,"Knife sharpening","Culinary"],[33,"Linux shell scripting","Tech"],
  [34,"Film score analysis","Music"],[35,"Rock climbing basics","Outdoor"],[36,"Speed chess","Mind"],
  [37,"Acrylic painting","Creative"],[38,"Make pancakes from scratch","Culinary"],[39,"Automate with Python scripts","Tech"],
  [40,"Music production basics","Music"],[41,"Balance on a rail","Physical"],[42,"Abacus arithmetic","Mind"],
  [43,"Macramé knots","Craft"],[44,"Fermentation (kimchi)","Culinary"],[45,"Command line basics","Tech"],
  [46,"Recorder basics","Music"],[47,"Yoga crow pose","Physical"],[48,"Solve a logic grid","Mind"],
  [49,"Decoupage","Creative"],[50,"Homemade yogurt","Culinary"],[51,"Intro to SQL","Tech"],
  [52,"Guitar power chords","Music"],[53,"Parkour safety rolls","Physical"],[54,"Rubik's cube faster","Mind"],
  [55,"Stencil art","Creative"],[56,"Bread braiding","Culinary"],[57,"Scratch game basics","Tech"],
  [58,"Piano scales (free app)","Music"],[59,"Swimming butterfly stroke","Physical"],[60,"Solving a cryptogram","Mind"],
  [61,"Tie-dye techniques","Craft"],[62,"Make hummus from scratch","Culinary"],[63,"HTML + CSS basics","Tech"],
  [64,"Beatbox hi-hat patterns","Music"],[65,"Slack-lining","Physical"],[66,"Deduction puzzles","Mind"],
  [67,"Wood burning (beginner kit)","Craft"],[68,"Tempering chocolate","Culinary"],[69,"Git version control","Tech"],
  [70,"Bucket drumming","Music"],[71,"Wall sit endurance","Physical"],[72,"Rapid typing 80 WPM","Tech"],
  [73,"Embroidery basics","Craft"],[74,"Make dumplings","Culinary"],[75,"Photography composition","Creative"],
  [76,"Fingerpicking guitar","Music"],[77,"Archery form","Outdoor"],[78,"Binary arithmetic","Tech"],
  [79,"Soap making","Craft"],[80,"Smoke/grill meats","Culinary"],[81,"Landscape photography (phone)","Creative"],
  [82,"Vocal harmonizing","Music"],[83,"Fencing footwork","Physical"],[84,"Morse code","Tech"],
  [85,"Friendship bracelet","Craft"],[86,"Make bone broth","Culinary"],[87,"Street photography (phone)","Creative"],
  [88,"Body percussion rhythms","Music"],[89,"Limbo flexibility","Physical"],[90,"Letter cipher decoding","Mind"],
  [91,"Kumihimo braiding","Craft"],[92,"Pickling vegetables","Culinary"],[93,"Portrait photography (phone)","Creative"],
  [94,"Spoons percussion","Music"],[95,"Breakdance toprock","Physical"],[96,"Map reading and navigation","Outdoor"],
  [97,"Candle making","Craft"],[98,"Make vinegar","Culinary"],[99,"Night photography (phone)","Creative"],
  [100,"Pen tapping rhythms","Music"],[101,"Splits flexibility","Physical"],[102,"Orienteering basics","Outdoor"],
  [103,"Whittling (stick + knife)","Craft"],[104,"Wild mushroom ID","Outdoor"],[105,"Long exposure photography","Creative"],
  [106,"Whistling melodies","Music"],[107,"Pistol squat","Physical"],[108,"Compass navigation","Outdoor"],
  [109,"Paper stained glass","Creative"],[110,"Foraging nettles","Outdoor"],[111,"Film photography (disposable)","Creative"],
  [112,"Kazoo + technique","Music"],[113,"Muscle-up on bar","Physical"],[114,"Star navigation","Outdoor"],
  [115,"Mosaic (broken tile)","Craft"],[116,"Track animal prints","Outdoor"],[117,"Cyanotype printing","Creative"],
  [118,"Tissue paper art","Creative"],[119,"Dragon flag exercise","Physical"],[120,"Build a campfire","Outdoor"],
  [121,"Needle felting","Craft"],[122,"Water purification","Outdoor"],[123,"Human flag hold","Physical"],
  [124,"Harmonica bending","Music"],[125,"Bowline knot","Outdoor"],[126,"Block printing (potato)","Creative"],
  [127,"Rug hooking","Craft"],[128,"Read animal behavior","Outdoor"],[129,"Silk screen printing","Creative"],
  [130,"Hum overtone singing","Music"],[131,"Rappelling basics","Outdoor"],[132,"Charcoal life drawing","Creative"],
  [133,"Cross-stitch basics","Craft"],[134,"Animal track casting","Outdoor"],[135,"Figure drawing","Creative"],
  [136,"Spoon drumming","Music"],[137,"Cave navigation","Outdoor"],[138,"Pastel drawing","Creative"],
  [139,"Bobbin lace basics","Craft"],[140,"Foraging acorns","Outdoor"],[141,"Perspective drawing","Creative"],
  [142,"Jaw harp (cheap)","Music"],[143,"Rope rappelling basics","Outdoor"],[144,"Anatomy sketching","Creative"],
  [145,"Finger knitting","Craft"],[146,"Shelter building","Outdoor"],[147,"Gesture drawing","Creative"],
  [148,"Box drumming rhythms","Music"],[149,"Snow shelter (quinzhee)","Outdoor"],[150,"Urban sketching","Creative"],
  [151,"Weaving on cardboard","Craft"],[152,"Raft building (sticks)","Outdoor"],[153,"Ink wash painting","Creative"],
  [154,"Stomp box rhythms","Music"],[155,"Cliff diving (safe entry)","Physical"],[156,"Calligraphy italic","Creative"],
  [157,"Nalbinding basics","Craft"],[158,"Sea kayaking basics","Outdoor"],[159,"Chinese brush painting","Creative"],
  [160,"Vocal percussion loop","Music"],[161,"Bouldering basics","Outdoor"],[162,"Graffiti lettering","Creative"],
  [163,"Cardboard loom weaving","Craft"],[164,"River swimming safety","Outdoor"],[165,"Watercolor wet-on-wet","Creative"],
  [166,"Beatbox bass drops","Music"],[167,"Canyoneering basics","Outdoor"],[168,"Linocut printing","Creative"],
  [169,"Finger crochet","Craft"],[170,"Breath-hold training","Physical"],[171,"Gouache painting","Creative"],
  [172,"Mouth trumpet","Music"],[173,"Trail running form","Physical"],[174,"Oil pastel painting","Creative"],
  [175,"Macramé wall hanging","Craft"],[176,"Marathon pacing plan","Physical"],[177,"Collage art","Creative"],
  [178,"Vocal runs and riffs","Music"],[179,"5K training plan","Physical"],[180,"Monotype printmaking","Creative"],
  [181,"Friendship knot bracelet","Craft"],[182,"Cycling hill training","Physical"],[183,"Drypoint etching (plastic)","Creative"],
  [184,"Cup drumming patterns","Music"],[185,"Stretching splits routine","Physical"],[186,"Mixed media art","Creative"],
  [187,"Spoon carving (soft wood)","Craft"],[188,"Open water swimming","Physical"],[189,"Texture rubbing art","Creative"],
  [190,"Stomp and clap rhythm","Music"],[191,"Duck dive freediving","Physical"],[192,"Magazine collage","Creative"],
  [193,"Pinch pot ceramics","Creative"],[194,"Cycling track standing","Physical"],[195,"Screen printing (DIY)","Creative"],
  [196,"Body percussion routine","Music"],[197,"Handcycle technique","Physical"],[198,"Zine making","Creative"],
  [199,"Paper weaving","Craft"],[200,"Fishing (hand line)","Outdoor"],[201,"Coil pot building","Creative"],
  [202,"Vocal chord isolation","Music"],[203,"Catch and cook a fish","Outdoor"],[204,"Slab ceramics (air dry)","Creative"],
  [205,"Origami box","Craft"],[206,"Fly fishing cast","Outdoor"],[207,"Slip glaze painting","Creative"],
  [208,"Snap and clap patterns","Music"],[209,"Ice fishing basics","Outdoor"],[210,"Slab building tiles","Creative"],
  [211,"Stone stacking art","Craft"],[212,"Net knot making","Outdoor"],[213,"Hand-built mug","Creative"],
  [214,"Rhythm on pots/pans","Music"],[215,"Beekeeping intro","Outdoor"],[216,"Pinch bowl set","Creative"],
  [217,"Paper clay sculpting","Craft"],[218,"Chicken keeping basics","Outdoor"],[219,"Air dry clay figures","Creative"],
  [220,"Vocal beatbox routine","Music"],[221,"Grow herbs indoors","Outdoor"],[222,"Clay tile stamping","Creative"],
  [223,"Wire art sculpture","Craft"],[224,"Rabbit care basics","Outdoor"],[225,"Relief printing","Creative"],
  [226,"Finger drumming (desk)","Music"],[227,"Composting setup","Outdoor"],[228,"Newspaper clay art","Creative"],
  [229,"Wire jewelry making","Craft"],[230,"Worm composting","Outdoor"],[231,"Foam printing","Creative"],
  [232,"Table tapping rhythms","Music"],[233,"Rainwater collection","Outdoor"],[234,"Sand casting art","Creative"],
  [235,"Tin foil sculpting","Craft"],[236,"Solar cooking (foil box)","Outdoor"],[237,"Paper mache mask","Creative"],
  [238,"Beatbox scratch sounds","Music"],[239,"Grow vegetables","Outdoor"],[240,"Paper mache bowl","Creative"],
  [241,"Aluminum wire rings","Craft"],[242,"Mushroom cultivation","Outdoor"],[243,"Sprout growing","Outdoor"],
  [244,"Whistling harmonics","Music"],[245,"Microgreens growing","Outdoor"],[246,"Aquaponics mini setup","Outdoor"],
  [247,"Bead jewelry making","Craft"],[248,"Grafting fruit trees","Outdoor"],[249,"Pruning plants","Outdoor"],
  [250,"Paper bead making","Craft"],[251,"Bonsai basics","Outdoor"],[252,"Ikebana (foraged flowers)","Creative"],
  [253,"Twig sculpture","Craft"],[254,"Terrarium building","Outdoor"],[255,"Pressed flower art","Creative"],
  [256,"Drumming on surfaces","Music"],[257,"Make herbal tea blends","Outdoor"],[258,"Basket weaving (paper)","Craft"],
  [259,"Braided cord bracelet","Craft"],[260,"Beeswax candles","Craft"],[261,"Lip balm making","Craft"],
  [262,"Clapping game rhythms","Music"],[263,"Cold process soap","Craft"],[264,"Beeswax wraps","Craft"],
  [265,"Pen percussion patterns","Music"],[266,"Natural plant dye","Craft"],[267,"Onion skin dyeing","Craft"],
  [268,"Body rhythm routine","Music"],[269,"Tie-dye spiral pattern","Craft"],[270,"Batik basics (wax resist)","Craft"],
  [271,"Stomp box beat","Music"],[272,"Boro mending (sashiko)","Craft"],[273,"Visible mending","Craft"],
  [274,"Cup beat pattern","Music"],[275,"Kintsugi repair (DIY)","Craft"],[276,"Paper marbling","Creative"],
  [277,"Spoon beat pattern","Music"],[278,"Book binding (coptic)","Craft"],[279,"Origami modular star","Creative"],
  [280,"Wall tap rhythm","Music"],[281,"Japanese stab binding","Craft"],[282,"Pop-up card design","Creative"],
  [283,"Hum chord stacking","Music"],[284,"Cardboard book cover","Craft"],[285,"Typography basics","Creative"],
  [286,"Chair percussion","Music"],[287,"Paper-making from pulp","Craft"],[288,"Letterpress (stamp set)","Creative"],
  [289,"Knee slap rhythms","Music"],[290,"Paper marbling v2","Creative"],[291,"Hand lettering","Creative"],
  [292,"Shaker making (rice jar)","Craft"],[293,"Accordion book binding","Craft"],[294,"Mini comic strip","Creative"],
  [295,"Thumb piano (DIY)","Craft"],[296,"Risograph-style zine","Creative"],[297,"Webcomic page","Creative"],
  [298,"Basic Spanish","Language"],[299,"Japanese hiragana","Language"],[300,"French greetings","Language"],
  [301,"Mandarin tones","Language"],[302,"Arabic script basics","Language"],[303,"German grammar basics","Language"],
  [304,"ASL basics","Language"],[305,"Italian pronunciation","Language"],[306,"Portuguese basics","Language"],
  [307,"Russian alphabet","Language"],[308,"Hindi Devanagari","Language"],[309,"Swahili basics","Language"],
  [310,"Greek alphabet","Language"],[311,"Korean Hangul","Language"],[312,"Turkish basics","Language"],
  [313,"Dutch basics","Language"],[314,"Polish basics","Language"],[315,"Hebrew alphabet","Language"],
  [316,"Meditation 10 min","Mind"],[317,"Breathwork (box breathing)","Mind"],[318,"Cold shower habit","Physical"],
  [319,"Journaling daily","Mind"],[320,"Gratitude practice","Mind"],[321,"Digital detox day","Mind"],
  [322,"Sleep tracking","Mind"],[323,"Habit stacking","Mind"],[324,"Pomodoro technique","Mind"],
  [325,"Speed writing freeflow","Mind"],[326,"Dream journaling","Mind"],[327,"Lucid dreaming basics","Mind"],
  [328,"Stoicism daily practice","Mind"],[329,"Mind mapping","Mind"],[330,"Zettelkasten notes","Mind"],
  [331,"Memorize a poem","Mind"],[332,"Rapid prototyping sketch","Tech"],[333,"Make a podcast episode","Creative"],
  [334,"Short film editing (free)","Creative"],[335,"Stop motion animation","Creative"],[336,"Vector illustration (free)","Creative"],
  [337,"Make a beat (free DAW)","Music"],[338,"Record a song at home","Music"],[339,"Remix a song (free tool)","Music"],
  [340,"MIDI composition (free)","Music"],[341,"Foley sound design","Creative"],[342,"Voice acting basics","Performance"],
  [343,"Stand-up comedy set","Performance"],[344,"Improv theater basics","Performance"],[345,"Storytelling arc","Performance"],
  [346,"Debate techniques","Social"],[347,"Negotiation basics","Social"],[348,"Public speaking basics","Social"],
  [349,"Active listening","Social"],[350,"Conflict resolution","Social"],[351,"Speed networking","Social"],
  [352,"Body language reading","Social"],[353,"Magic card trick","Performance"],[354,"Coin vanish magic","Performance"],
  [355,"Cup and ball magic","Performance"],[356,"Rope magic basics","Performance"],[357,"Mentalism cold read","Performance"],
  [358,"Balloon animal basics","Performance"],[359,"Face painting basics","Performance"],[360,"Stilt walking (low stilts)","Performance"],
  [361,"Staff spinning basics","Performance"],[362,"Contact juggling","Performance"],[363,"Poi spinning (socks)","Performance"],
  [364,"Hula hoop tricks","Performance"],[365,"Yo-yo advanced tricks","Performance"]
];

// Category-level templates for description, how-to, difficulty, time, resources
const CATEGORY_INFO = {
  "Performance": {
    diff: "Easy to medium",
    time: "20–60 minutes",
    desc: "A performance skill — the kind of thing that gets attention at parties or pulls a smile out of a stranger. The reward is in the showing, but the real fun is in the practice.",
    howto: "Watch one video tutorial all the way through before trying. Don't rush — practice in front of a mirror so you can see what you're doing. Aim for one solid attempt per minute, not flailing.",
    res: ["YouTube tutorials","Reddit r/howtoperform","TikTok #learnwithme"]
  },
  "Physical": {
    diff: "Medium to hard",
    time: "15–45 minutes",
    desc: "A movement skill that builds your body's vocabulary. Start slow, focus on form before speed or intensity. Your future self will thank you.",
    howto: "Warm up first — five minutes of light movement. Watch one tutorial focused on form, not flashy moves. Try ten reps, rest, then ten more. Stop if anything sharp hurts.",
    res: ["YouTube fitness channels","r/bodyweightfitness","Calisthenicmovement on YT"]
  },
  "Mind": {
    diff: "Medium",
    time: "20–40 minutes",
    desc: "A skill that sharpens how you think. Hard at first, but each session compounds — what's impossible today becomes effortless in a few weeks.",
    howto: "Start with the simplest version of the skill. Don't worry about speed yet. Track one number — solve time, accuracy, whatever — so you can see progress over time.",
    res: ["Khan Academy","Brilliant.org","r/puzzles"]
  },
  "Creative": {
    diff: "Easy to medium",
    time: "30–90 minutes",
    desc: "A making skill. The first attempt will look rough — that's the price of admission. The point isn't a masterpiece, it's learning the moves.",
    howto: "Set up your space first — clean surface, tools within reach. Watch one demo. Then make something small and ugly on purpose. Save the result.",
    res: ["YouTube tutorials","Pinterest for inspiration","r/learnart or r/crafts"]
  },
  "Culinary": {
    diff: "Easy to medium",
    time: "30–120 minutes",
    desc: "A cooking skill. The kitchen is the best lab there is — every mistake is delicious or at least edible. Read the whole recipe before starting.",
    howto: "Read the recipe twice. Set out all ingredients before you turn on the stove (this is called mise en place). Follow the recipe exactly the first time, then riff on the second.",
    res: ["BBC Good Food","Serious Eats","r/cooking","YouTube channels (Babish, Adam Ragusea)"]
  },
  "Outdoor": {
    diff: "Medium",
    time: "1–3 hours",
    desc: "An outdoor skill. Best learned by getting out there. Tell someone where you're going, and start with the easiest version close to home.",
    howto: "Read up first, but don't over-research. Pick the smallest possible version of the activity (a short trail, an easy spot). Bring water. Go with a friend if it's risky.",
    res: ["REI Expert Advice","r/wilderness","local outdoor clubs"]
  },
  "Social": {
    diff: "Medium",
    time: "20–60 minutes",
    desc: "A people skill. Hardest to practice alone, but the most useful skill on this whole list. Awkwardness is part of the curriculum.",
    howto: "Read a short article on the basics. Try the technique once today in a low-stakes situation. Notice what worked and what felt fake. Adjust.",
    res: ["TED Talks on communication","Books: How to Win Friends, Crucial Conversations","r/socialskills"]
  },
  "Tech": {
    diff: "Easy to medium",
    time: "30–90 minutes",
    desc: "A digital skill that pays compound interest. Every hour you put in saves you ten later. Free tools, free tutorials, no excuses.",
    howto: "Pick one free interactive tutorial — don't just read. Type every line yourself. When something breaks, that's the lesson, not the failure.",
    res: ["freeCodeCamp","MDN Web Docs","Codecademy","YouTube (Fireship, Web Dev Simplified)"]
  },
  "Language": {
    diff: "Easy",
    time: "15–30 minutes",
    desc: "A language skill. The first day is just opening the door. Consistency beats intensity — fifteen minutes a day for a year will get you further than a weekend cram.",
    howto: "Download Duolingo or Memrise. Do one lesson today. Listen to one native speaker for two minutes (YouTube, podcasts). Don't try to memorize — just expose your ears.",
    res: ["Duolingo","Memrise","Anki","YouTube native channels","r/languagelearning"]
  },
  "Music": {
    diff: "Easy to medium",
    time: "15–45 minutes",
    desc: "A music skill. Your ear and your hands have to learn to talk to each other. Loop the same short pattern until it's automatic, then move on.",
    howto: "Watch one tutorial. Find a slow tempo and stay there. Record yourself on your phone and listen back — it's painful but it's the fastest way to improve.",
    res: ["YouTube tutorials","r/WeAreTheMusicMakers","Justin Guitar (free)"]
  },
  "Craft": {
    diff: "Easy to medium",
    time: "30–90 minutes",
    desc: "A handmaking skill. Slow, tactile, satisfying. The end product matters less than the meditation of the making.",
    howto: "Gather materials before you start. Watch one tutorial. Make a small test piece first. Don't expect the first attempt to be the keeper.",
    res: ["YouTube craft channels","Pinterest","r/crafts","Instructables"]
  }
};

// Skill-specific overrides — richer detail for the famous/iconic ones
const SKILL_DETAILS = {
  1: { desc: "Whistling is one of the oldest forms of human music — every culture has it. Lip whistling is the easiest entry point.", howto: "Wet your lips slightly. Pucker like you're saying 'oo'. Blow gently — not hard. Adjust your tongue position to find the note. If nothing comes out, try smiling slightly while puckered.", time: "10–20 minutes" },
  2: { desc: "Three-ball juggling is the gateway skill to circus arts. Once you've got it, you can scale to clubs, knives, and chainsaws (eventually).", howto: "Start with one ball — toss from right hand to left in an arc at eye level. Now two: toss right ball, when it peaks toss left ball under it. Add the third on day three. Drop a lot. That's normal.", time: "30–60 minutes" },
  3: { desc: "The Rubik's cube was solved by computers in milliseconds, but solving it yourself is one of the most satisfying mental loops there is. The world record is under 4 seconds.", howto: "Use the layer-by-layer (beginner) method. Solve white cross → white corners → middle layer → yellow cross → yellow corners → orient last layer. Memorize about 7 algorithms total.", res: ["J Perm on YouTube","CubeSkills.com","Reddit r/Cubers"], time: "1–3 hours for first solve" },
  9: { desc: "Touch typing — typing without looking at the keyboard — is one of the highest-leverage skills you can learn. Every email, every essay, every line of code is faster forever.", howto: "Place fingers on home row (ASDF JKL;). Use Monkeytype or Keybr.com. Don't peek. Accuracy first, speed second. 15 minutes a day for a month gets you to 50+ WPM.", res: ["Monkeytype.com","Keybr.com","TypingClub"], time: "20 minutes daily" },
  15: { desc: "HTML is the bones of every webpage. By the end of today you'll know enough to build a personal site.", howto: "Open any text editor. Type the basic structure: html, head, body. Add headings, paragraphs, links, images. Save as .html and open in a browser. That's it — you've made a webpage.", res: ["MDN Web Docs HTML guide","freeCodeCamp HTML course","W3Schools"], time: "45–90 minutes" },
  33: { desc: "Python is the most beginner-friendly serious programming language. Used by NASA, Netflix, and every data scientist alive.", howto: "Use replit.com or install Python locally. Print 'hello world'. Then learn variables, if/else, loops, functions — in that order. Don't skip ahead.", res: ["freeCodeCamp Python course","Automate the Boring Stuff (free book)","Replit.com"], time: "1–2 hours" },
  316: { desc: "Ten minutes of meditation isn't going to enlighten you, but it will measurably reduce your stress and improve your focus. The science is solid.", howto: "Sit comfortably. Set a 10-minute timer. Focus on your breath at the nostrils. When you notice you're thinking — and you will, constantly — gently return to the breath. That's it. That's the whole thing.", res: ["Headspace (free trial)","Insight Timer (free)","Sam Harris's Waking Up app"], time: "10 minutes" }
};

// Build the merged skill object
function getSkill(day) {
  const entry = SKILLS.find(s => s[0] === day);
  if (!entry) return null;
  const [d, name, cat] = entry;
  const base = CATEGORY_INFO[cat] || CATEGORY_INFO["Mind"];
  const override = SKILL_DETAILS[day] || {};
  return {
    day: d,
    name,
    category: cat,
    difficulty: override.diff || base.diff,
    time: override.time || base.time,
    description: override.desc || `${name} — ${base.desc.toLowerCase()}`,
    howto: override.howto || base.howto,
    resources: override.res || base.res
  };
}

const CATEGORIES = ["All","Performance","Physical","Mind","Creative","Culinary","Tech","Music","Craft","Outdoor","Language","Social"];

// Backup pool — used when a skill is rejected in dev mode
// Large pool per category so repeated rejections never cycle
const BACKUP_SKILLS = {
  "Performance": [
    { name: "Kendama basics" }, { name: "Finger tutting" }, { name: "Popping dance basics" },
    { name: "Devil sticks basics" }, { name: "Plate spinning" }, { name: "Diabolo basics" },
    { name: "Ventriloquism basics" }, { name: "Mime basics" }, { name: "Floor acrobatics" },
    { name: "Chinese yo-yo" }, { name: "Poi flowers advanced" }, { name: "Clown juggling basics" },
    { name: "Aerial scarf basics" }, { name: "Balance board tricks" }, { name: "Hand balancing basics" }
  ],
  "Physical": [
    { name: "L-sit progression" }, { name: "Skin the cat" }, { name: "Nordic hamstring curl" },
    { name: "Back lever progression" }, { name: "Wrist pushup basics" }, { name: "Typewriter pull-up" },
    { name: "Headstand pushup" }, { name: "Planche lean" }, { name: "Ring dips" },
    { name: "Tuck planche basics" }, { name: "Backward bridge walk" }, { name: "Capoeira ginga" },
    { name: "Windmill breakdance" }, { name: "Weighted carry (farmer's walk)" }, { name: "Plyometric jump training" }
  ],
  "Mind": [
    { name: "Feynman learning technique" }, { name: "Dual N-back training" },
    { name: "Lateral thinking puzzles" }, { name: "Mental multiplication tricks" },
    { name: "Visualization practice" }, { name: "Speed reading skimming" },
    { name: "Loci method advanced" }, { name: "Active reading markup" },
    { name: "Mind map from memory" }, { name: "Reverse brainstorming" },
    { name: "Systems thinking basics" }, { name: "Analogical reasoning" },
    { name: "Socratic self-questioning" }, { name: "Narrative journaling" }, { name: "Attention training" }
  ],
  "Creative": [
    { name: "Zentangle drawing" }, { name: "Pointillism art" }, { name: "Pixel art (free tool)" },
    { name: "Digital hand lettering" }, { name: "Cinemagraph basics" }, { name: "Blind contour drawing" },
    { name: "Negative space art" }, { name: "One-line continuous drawing" }, { name: "Sketchnoting" },
    { name: "Portrait from photo reference" }, { name: "Isometric drawing" }, { name: "Thumbnail sketching" },
    { name: "Value studies (grayscale)" }, { name: "Color theory basics" }, { name: "Abstract mark-making" }
  ],
  "Culinary": [
    { name: "Miso from scratch" }, { name: "Candy making basics" },
    { name: "Ramen broth from scratch" }, { name: "Cheesemaking basics" },
    { name: "Lacto-fermented hot sauce" }, { name: "Homemade butter" },
    { name: "Infused oils" }, { name: "Preserved lemons" }, { name: "Cultured cream cheese" },
    { name: "Handmade udon noodles" }, { name: "Herb-infused vinegar" }, { name: "Homemade mustard" },
    { name: "Compound butter" }, { name: "Fruit jam from scratch" }, { name: "Cured egg yolks" }
  ],
  "Tech": [
    { name: "Regular expressions" }, { name: "Vim navigation basics" },
    { name: "Browser DevTools" }, { name: "Docker basics" }, { name: "Linux shell scripting" },
    { name: "API calls with fetch" }, { name: "CSS animations" }, { name: "JavaScript promises" },
    { name: "Web accessibility basics" }, { name: "SVG drawing with code" },
    { name: "Build a CLI tool" }, { name: "Write a web scraper" },
    { name: "Chrome extension basics" }, { name: "Keyboard shortcut remapping" },
    { name: "Automate with Python scripts" }
  ],
  "Music": [
    { name: "Theremin (free app)" }, { name: "Circle of fifths" },
    { name: "Acapella arrangement" }, { name: "Turntablism basics" }, { name: "Tin whistle basics" },
    { name: "Music theory intervals" }, { name: "Chord substitution" }, { name: "Ear training fundamentals" },
    { name: "Rhythmic solfège" }, { name: "Songwriting structure" },
    { name: "Pentatonic improv" }, { name: "Music production basics (free DAW)" },
    { name: "Film score analysis" }, { name: "Bass line writing" }, { name: "Polyrhythm basics" }
  ],
  "Craft": [
    { name: "Resin art basics" }, { name: "Polymer clay sculpting" },
    { name: "Leather saddle stitch" }, { name: "String art" }, { name: "Fabric marbling" },
    { name: "Punch needle embroidery" }, { name: "Alcohol ink art" }, { name: "Wire-wrapped crystals" },
    { name: "Paper quilling" }, { name: "Seed bead weaving" }, { name: "Crochet granny square" },
    { name: "Patchwork quilt square" }, { name: "Needlepoint basics" }, { name: "Knotted rug making" },
    { name: "Shrink plastic art" }
  ],
  "Outdoor": [
    { name: "Bow drill fire starting" }, { name: "Tree identification" },
    { name: "Foraging berries safely" }, { name: "Night sky navigation" },
    { name: "Wilderness first aid basics" }, { name: "Edible plant ID" },
    { name: "Primitive lean-to shelter" }, { name: "Advanced knot tying" },
    { name: "Fishing fly tying" }, { name: "Paddleboard basics" },
    { name: "Cold weather camping prep" }, { name: "Tidal pool exploration" },
    { name: "Rain collection system" }, { name: "Animal track identification" },
    { name: "Orienteering with map only" }
  ],
  "Language": [
    { name: "Esperanto basics" }, { name: "IPA phonetics reading" }, { name: "Thai script basics" },
    { name: "Tagalog basics" }, { name: "Vietnamese tones" }, { name: "Finnish basics" },
    { name: "Icelandic pronunciation" }, { name: "Swahili phrase basics" },
    { name: "Braille alphabet" }, { name: "Semaphore signals" },
    { name: "Amharic script basics" }, { name: "Welsh pronunciation" },
    { name: "Constructed language design" }, { name: "Dialect spotting" }, { name: "Indonesian basics" }
  ],
  "Social": [
    { name: "Elevator pitch" }, { name: "Socratic questioning" }, { name: "Graceful disagreement" },
    { name: "Cold email writing" }, { name: "Reading microexpressions" },
    { name: "Motivational interviewing" }, { name: "Active constructive responding" },
    { name: "Strategic networking" }, { name: "Persuasive writing" }, { name: "Running a meeting" },
    { name: "Giving actionable feedback" }, { name: "Receiving criticism gracefully" },
    { name: "Building rapport quickly" }, { name: "Storytelling for persuasion" },
    { name: "Hosting a dinner party" }
  ]
};
