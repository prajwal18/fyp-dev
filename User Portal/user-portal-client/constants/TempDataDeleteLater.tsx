import ProfileImage from '@/components/Common/components/ProfileImage';
import { TypesOfQuestions } from './Constants';
import {
    TableHeadPT
} from './CustomTypes';


export const PeopleHeadData: Array<TableHeadPT> = [
    {
        name: "S.N"
    },
    {
        name: "Profile"
    },
    {
        name: 'Role'
    },
    {
        name: "Name",
    },
    {
        name: "Email",
    },
    {
        name: "Actions"
    }
];
export const AssignmentHeadData: Array<TableHeadPT> = [
    {
        name: 'Name'
    },
    {
        name: 'Course'
    },
    {
        name: 'Status'
    },
    {
        name: 'Due Date'
    },
    {
        name: 'Total'
    },
    {
        name: 'Obtained'
    },
    {
        name: 'Actions'
    },
];

export const TestHeadData: Array<TableHeadPT> = [
    {
        name: 'Name'
    },
    {
        name: 'Course'
    },
    {
        name: 'Status'
    },
    {
        name: 'Due Date'
    },
    {
        name: 'Total'
    },
    {
        name: 'Obtained'
    },
    {
        name: 'Actions'
    }
];


export const PeopleBodyData = [
    {
        profile: <ProfileImage />,
        role: 'Student',
        name: 'Rajan Don',
        email: 'chota@gmail.com'
    },
    {
        profile: <ProfileImage />,
        role: 'Teacher',
        name: 'Komal Kanpur',
        email: 'chetan@gmail.com'
    },
    {
        profile: <ProfileImage />,
        role: 'Teacher',
        name: 'Don Man Bing',
        email: 'saroj@gmail.com'
    },
    {
        profile: <ProfileImage />,
        role: 'Student',
        name: 'Bossman Ross',
        email: 'suraj@gmail.com'
    },
    {
        profile: <ProfileImage />,
        role: 'Student',
        name: 'Mobies Design',
        email: 'kumar@gmail.com'
    },
    {
        profile: <ProfileImage />,
        role: 'Teacher',
        name: 'Rajan Don',
        email: 'ganesh@gmail.com'
    }
];
export const AssignmentBodyData = [{
    "name": "Gale Dahlman",
    "course": "France",
    "status": 'TODO',
    "due_date": "2/18/2023",
    "total": 100,
    "obtained": null
}, {
    "name": "Bev Clover",
    "course": "Poland",
    "status": "SUBMITED",
    "due_date": "4/6/2022",
    "total": 100,
    "obtained": null
}, {
    "name": "Lanae Niesing",
    "course": "Portugal",
    "status": 'GRADED',
    "due_date": "8/22/2022",
    "total": 100,
    "obtained": 91
}, {
    "name": "Suzi D'Elias",
    "course": "Indonesia",
    "status": 'TODO',
    "due_date": "9/20/2022",
    "total": 100,
    "obtained": null
}, {
    "name": "Melitta Addenbrooke",
    "course": "South Africa",
    "status": 'GRADED',
    "due_date": "7/21/2022",
    "total": 100,
    "obtained": 75
}, {
    "name": "Josey Spurge",
    "course": "Ukraine",
    "status": 'GRADED',
    "due_date": "4/25/2022",
    "total": 100,
    "obtained": 12
}, {
    "name": "Titus Howard",
    "course": "Peru",
    "status": 'SUBMITED',
    "due_date": "10/27/2022",
    "total": 100,
    "obtained": null
}, {
    "name": "Janel Izkoveski",
    "course": "Russia",
    "status": 'TODO',
    "due_date": "9/1/2022",
    "total": 100,
    "obtained": null
}, {
    "name": "Dallon Zannolli",
    "course": "Portugal",
    "status": 'GRADED',
    "due_date": "12/23/2022",
    "total": 100,
    "obtained": 29
}, {
    "name": "Kaine Kuscha",
    "course": "Ethiopia",
    "status": 'GRADED',
    "due_date": "4/27/2022",
    "total": 100,
    "obtained": 68
}]



const MockTestInstructions = `
  <p style="margin-bottom: 1.5em; font-size: 13.58px; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><strong style="font-weight: 700;">INTRODUCTION TO THE NOUN</strong></p><p style="margin-bottom: 1.5em; font-size: 13.58px; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">In the Introductory Lesson, we learned that all English words can be divided into eight "parts of speech": nouns, pronouns, adjectives, verbs, adverbs, prepositions, conjunctions, and interjections. Review the Introductory Lesson until you are able to list the eight parts of speech and explain each one. In this lesson, we begin our study of the noun. We will learn to recognize and to use different kinds of nouns: proper, common, collective, concrete, abstract, specific, and non-specific. Don't be afraid of these words. You will understand their meaning by the time you finish this lesson.</p><p style="margin-bottom: 1.5em; font-size: 13.58px; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><strong style="font-weight: 700;">NOUNS TO LEARN</strong></p><ol style="margin: 0px 0px 1.5em; font-size: 13.58px; padding-left: 24px; list-style-type: decimal; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><li>"<strong style="font-weight: 700;">cell</strong>" (noun) - the smallest structural unit in the body of a plant or animal.<br>Sentence: "An animal cell is so small that we cannot see one without a microscope."</li><li>"<strong style="font-weight: 700;">evidence</strong>" (noun) - the facts on which a judgment can be made.<br>Sentence: "Fossil records provide little or no evidence to support the theory of evolution."</li><li>"<strong style="font-weight: 700;">handiwork</strong>" (noun) - the work that someone has done by hand.<br>Sentence: "When we look at a sunset or a rainbow, we see the handiwork of God."</li><li>"<strong style="font-weight: 700;">mystery</strong>" (noun) - something that is unknown or unexplained.<br>Sentence: "There are many mysteries in nature that scientists have not been able to explain."</li><li>"<strong style="font-weight: 700;">personality</strong>" (noun) the qualities of being a person.<br>Sentence: "God has all the qualities of personality."</li><li>"<strong style="font-weight: 700;">theory</strong>" (noun) - a system of conclusions based on reasoning.<br>Sentence: "A theory is something a person believes but is not able to prove.</li><li>"<strong style="font-weight: 700;">universe</strong>" (noun) - all things that exist, regarded as a whole.<br>Sentence: "No one knows how big the universe really is."</li></ol><p style="margin-bottom: 1.5em; font-size: 13.58px; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><strong style="font-weight: 700;">OTHER WORDS TO LEARN</strong></p><ol style="margin: 0px 0px 1.5em; font-size: 13.58px; padding-left: 24px; list-style-type: decimal; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><li>"<strong style="font-weight: 700;">create</strong>" (verb) - to cause to exist.<br>Sentence: "In the beginning, God created the earth and sky."</li><li>"<strong style="font-weight: 700;">design</strong>" (verb) to create a plan, sketch, or pattern.<br>Sentence: "Could any man have designed the human body?"</li><li>"<strong style="font-weight: 700;">evolve</strong>" (verb) - to develop slowly.<br>Sentence: "Some scientists believe that life on earth evolved spontaneously, without the help of God."</li><li>"<strong style="font-weight: 700;">generate</strong>" (infinitive) [a verb preceded by "to"] - to bring into existence.<br>Sentence: "Falling water is often used to generate electricity."</li><li>"<strong style="font-weight: 700;">reproductive</strong>" (adjective) - serving to reproduce or to bring forth again.<br>Sentence: "The acorn is part of the oak tree's reproductive system."</li><li>"<strong style="font-weight: 700;">spontaneously</strong>" (adverb) - without outside cause.<br>Sentence: "Oily rags sometimes burst into flames spontaneously."</li></ol><p style="margin-bottom: 1.5em; font-size: 13.58px; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><strong style="font-weight: 700;">WHAT IS A NOUN</strong>?</p><p style="margin-bottom: 1.5em; font-size: 13.58px; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">A<span>&nbsp;</span><strong style="font-weight: 700;">noun</strong><span>&nbsp;</span>is a word that names a person, place, or thing (object, animal, idea, action, quality, feeling, or event). The term "noun" means "name."</p><p style="margin-bottom: 1.5em; font-size: 13.58px; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">All people have names. You have a family name, a given name, and probably a middle name. What are your names? Write them down. Each of your names is a noun.</p><p style="margin-bottom: 1.5em; font-size: 13.58px; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">You also have other names. You are a student, a teacher, a worker, a boy, girl, man, or woman. You are a brother, sister, son, daughter, mother, or father. These words are nouns. They are names given to people.</p><p style="margin-bottom: 1.5em; font-size: 13.58px; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Places, too, have names. Where do you live? On what street or road? In what village, town, or city? In what county, state, province, or nation? By what river or lake? These words are nouns also. They are names of places.</p><p style="margin-bottom: 1.5em; font-size: 13.58px; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Things have names also. Look around you. Make a list of the things you see. The words that you write down are nouns. Make a list of things you ate for breakfast and lunch today. You have just made another list of nouns. Things like trees, grass, fish and birds are nouns. So are qualities like wisdom, power, and truth. So are feelings such as fear, love, happiness, and joy, and events such as the creation, a meeting, a vacation, or a party. All these words are nouns. They are names of things.</p><table border="0" style="border-collapse: collapse; border-spacing: 0px; margin-bottom: 1.4em; width: 641.925px; font-size: 0.875em; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><thead><tr style="background-color: rgba(223, 225, 232, 0.27);"><th style="font-weight: 700; text-align: left; background-color: rgb(219, 220, 228); padding: 0.25em 10px 0.25em 5px;"><strong style="font-weight: 700;">Person</strong></th><th style="font-weight: 700; text-align: left; background-color: rgb(219, 220, 228); padding: 0.25em 10px 0.25em 5px;"><strong style="font-weight: 700;">Place</strong></th><th style="font-weight: 700; text-align: left; background-color: rgb(219, 220, 228); padding: 0.25em 10px 0.25em 5px;"><strong style="font-weight: 700;">Thing</strong></th></tr></thead><tbody><tr style="background-color: rgba(223, 225, 232, 0.27);"><td style="padding: 0.25em 10px 0.25em 5px;">child</td><td style="padding: 0.25em 10px 0.25em 5px;">school</td><td style="padding: 0.25em 10px 0.25em 5px;">desk</td></tr><tr><td style="padding: 0.25em 10px 0.25em 5px;">mother</td><td style="padding: 0.25em 10px 0.25em 5px;">nursery</td><td style="padding: 0.25em 10px 0.25em 5px;">diaper</td></tr><tr style="background-color: rgba(223, 225, 232, 0.27);"><td style="padding: 0.25em 10px 0.25em 5px;">president</td><td style="padding: 0.25em 10px 0.25em 5px;">company</td><td style="padding: 0.25em 10px 0.25em 5px;">profit</td></tr></tbody></table><p style="margin-bottom: 1.5em; font-size: 13.58px; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Sometimes a noun is a group of words.<br>Examples: "maid of honor," "justice of the peace," "Mount Hood," "sea gull," "ice cream." Since these words must go together to make sense, each group of words is considered one noun. "Ice cream" is one noun.</p><p style="margin-bottom: 1.5em; font-size: 13.58px; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><strong style="font-weight: 700;">PROPER, COMMON, AND COLLECTIVE NOUNS</strong></p><p style="margin-bottom: 1.5em; font-size: 13.58px; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">A "<strong style="font-weight: 700;">proper noun</strong>" names a specific person, place, or thing and always begins with a capital letter. Examples: Adam, Tigris, Beijing, China, Monday, July, English.<span>&nbsp;</span><span rel="font-size: x-small;" style="font-size: x-small;"><span rel="font-family: Arial; color: #000000;" style="font-family: Arial; color: rgb(0, 0, 0);">The first word in a sentence also starts with a capital letter.</span></span></p><p style="margin-bottom: 1.5em; font-size: 13.58px; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Write the names of people in your family. These names are proper nouns. Examples: John, Eve</p><p style="margin-bottom: 1.5em; font-size: 13.58px; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Names of your street, city, state or province, and nation are proper nouns. Example: 15 Oak Street, Cole, Iowa 97030; U.S.A.</p><p style="margin-bottom: 1.5em; font-size: 13.58px; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Make a list of mountains, rivers, lakes, seas, or oceans in your area. Each of these words is a proper noun and should begin with a capital letter. Examples: Mount Everest; Nile River; Dead Sea.</p><p style="margin-bottom: 1.5em; font-size: 13.58px; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">A "<strong style="font-weight: 700;">common noun</strong>" is a word that names any kind of person, place, or thing. Examples: man, woman, river, lake, city, country, day, month, language. A common noun never begins with a capital letter except at the beginning of a sentence or when used with a proper noun. The words "river" and "college" are common nouns, but when they are used to specify a certain river or college, they become proper nouns and are capitalized. Examples: Columbia River; Columbia Christian College. Whenever a common noun is used to set a person, place, or thing apart from others of the same class, it becomes a proper noun.</p><p style="margin-bottom: 1.5em; font-size: 13.58px; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">A "<strong style="font-weight: 700;">collective noun</strong>" refers to a group of people or things that are bound together as a unit. A collective noun is singular in form, but refers to more than one.<br>Examples: assembly, crew, fleet, flock, herd, jury, litter, swarm, school.</p><table border="0" style="border-collapse: collapse; border-spacing: 0px; margin-bottom: 1.4em; width: 641.925px; font-size: 0.875em; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><thead><tr style="background-color: rgba(223, 225, 232, 0.27);"><th style="font-weight: 700; text-align: left; background-color: rgb(219, 220, 228); padding: 0.25em 10px 0.25em 5px;"><strong style="font-weight: 700;">Proper</strong></th><th style="font-weight: 700; text-align: left; background-color: rgb(219, 220, 228); padding: 0.25em 10px 0.25em 5px;"><strong style="font-weight: 700;">Common</strong></th><th style="font-weight: 700; text-align: left; background-color: rgb(219, 220, 228); padding: 0.25em 10px 0.25em 5px;"><strong style="font-weight: 700;">Collective</strong></th></tr></thead><tbody><tr style="background-color: rgba(223, 225, 232, 0.27);"><td style="padding: 0.25em 10px 0.25em 5px;">Joe Montana</td><td style="padding: 0.25em 10px 0.25em 5px;">quarterback</td><td style="padding: 0.25em 10px 0.25em 5px;">team</td></tr><tr><td style="padding: 0.25em 10px 0.25em 5px;">U.S.S. Missouri</td><td style="padding: 0.25em 10px 0.25em 5px;">battleship</td><td style="padding: 0.25em 10px 0.25em 5px;">fleet</td></tr><tr style="background-color: rgba(223, 225, 232, 0.27);"><td style="padding: 0.25em 10px 0.25em 5px;">Snoopy</td><td style="padding: 0.25em 10px 0.25em 5px;">dog</td><td style="padding: 0.25em 10px 0.25em 5px;">litter</td></tr><tr><td style="padding: 0.25em 10px 0.25em 5px;">Eve</td><td style="padding: 0.25em 10px 0.25em 5px;">woman</td><td style="padding: 0.25em 10px 0.25em 5px;">family</td></tr></tbody></table><p style="margin-bottom: 1.5em; font-size: 13.58px; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><strong style="font-weight: 700;">CONCRETE AND ABSTRACT NOUNS</strong></p><p style="margin-bottom: 1.5em; font-size: 13.58px; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">A "<strong style="font-weight: 700;">concrete noun</strong>" names a person, place, or thing that can be heard, seen, smelled, tasted, or touched.<br>Examples: owl, banana, cake, train, oil, pig, man.<br>We become aware of these persons and material objects through the physical senses.<br>An<span>&nbsp;</span><strong style="font-weight: 700;">"abstract noun"</strong><span>&nbsp;</span>names a quality, feeling, or idea.<br>Examples: love, fear, intelligence, goodness.<br>These are general. They do not refer to a certain case or example or to a material object. We become aware of them through our thoughts and emotions.</p><table border="0" style="border-collapse: collapse; border-spacing: 0px; margin-bottom: 1.4em; width: 641.925px; font-size: 0.875em; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><thead><tr style="background-color: rgba(223, 225, 232, 0.27);"><th style="font-weight: 700; text-align: left; background-color: rgb(219, 220, 228); padding: 0.25em 10px 0.25em 5px;"><strong style="font-weight: 700;">Concrete Nouns</strong></th><th style="font-weight: 700; text-align: left; background-color: rgb(219, 220, 228); padding: 0.25em 10px 0.25em 5px;"><strong style="font-weight: 700;">Abstract Nouns</strong></th></tr></thead><tbody><tr style="background-color: rgba(223, 225, 232, 0.27);"><td style="padding: 0.25em 10px 0.25em 5px;">horse</td><td style="padding: 0.25em 10px 0.25em 5px;">strength</td></tr><tr><td style="padding: 0.25em 10px 0.25em 5px;">swan</td><td style="padding: 0.25em 10px 0.25em 5px;">grace</td></tr><tr style="background-color: rgba(223, 225, 232, 0.27);"><td style="padding: 0.25em 10px 0.25em 5px;">flower</td><td style="padding: 0.25em 10px 0.25em 5px;">beauty</td></tr><tr><td style="padding: 0.25em 10px 0.25em 5px;">joke</td><td style="padding: 0.25em 10px 0.25em 5px;">humor</td></tr></tbody></table><p style="margin-bottom: 1.5em; font-size: 13.58px; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><strong style="font-weight: 700;">SPECIFIC AND NONSPECIFIC NOUNS</strong></p><p style="margin-bottom: 1.5em; font-size: 13.58px; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">A "<strong style="font-weight: 700;">specific noun</strong>" is a noun that names a certain class of persons or things.<br>A<span>&nbsp;</span><strong style="font-weight: 700;">nonspecific noun</strong><span>&nbsp;</span>is general in nature and does not specify a certain class of person or things.</p><table border="0" style="border-collapse: collapse; border-spacing: 0px; margin-bottom: 1.4em; width: 641.925px; font-size: 0.875em; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><thead><tr style="background-color: rgba(223, 225, 232, 0.27);"><th style="font-weight: 700; text-align: left; background-color: rgb(219, 220, 228); padding: 0.25em 10px 0.25em 5px;"><strong style="font-weight: 700;">Specific Nouns</strong></th><th style="font-weight: 700; text-align: left; background-color: rgb(219, 220, 228); padding: 0.25em 10px 0.25em 5px;"><strong style="font-weight: 700;">Nonspecific Nouns</strong></th></tr></thead><tbody><tr style="background-color: rgba(223, 225, 232, 0.27);"><td style="padding: 0.25em 10px 0.25em 5px;">dog</td><td style="padding: 0.25em 10px 0.25em 5px;">animal</td></tr><tr><td style="padding: 0.25em 10px 0.25em 5px;">crow</td><td style="padding: 0.25em 10px 0.25em 5px;">bird</td></tr><tr style="background-color: rgba(223, 225, 232, 0.27);"><td style="padding: 0.25em 10px 0.25em 5px;">rose</td><td style="padding: 0.25em 10px 0.25em 5px;">flower</td></tr><tr><td style="padding: 0.25em 10px 0.25em 5px;">ant</td><td style="padding: 0.25em 10px 0.25em 5px;">insect</td></tr></tbody></table><p style="margin-bottom: 1.5em; font-size: 13.58px; color: rgb(51, 51, 51); font-family: &quot;helvetica neue&quot;, Helvetica, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Now answer the questions to this lesson; then go to Reading Assignment 1 and look for nouns. Notice how many nouns there are in the lesson and how important nouns are to the English language. Complete the questions, and Lessons 2 will be sent to you.</p>
  `;

const MockTestQuestions = [
    {
        id: 1,
        question: "Adam and Eve were happy outside the garden of Eden.",
        questionType: TypesOfQuestions.MCQ,
        choices: ["true", "false"],
        correctChoice: ["true"],
        yourAnswer: ["false"],
        marks: 10,
        marksObtained: 0
    },
    {
        id: 2,
        question: "When sin enters life, one sin leads to another.",
        questionType: TypesOfQuestions.MCQ,
        choices: [
            "true", "false"
        ],
        correctChoice: ["true"],
        yourAnswer: ["true"],
        marks: 10,
        marksObtained: 10
    },
    {
        id: 3,
        question: "Cain's sins cut him off from God but made him popular with other people.",
        questionType: TypesOfQuestions.MCQ,
        choices: [
            "true", "flase"
        ],
        correctChoice: ["false"],
        yourAnswer: ["true"],
        marks: 10,
        marksObtained: 0
    },
    {
        id: 4,
        question: "Abel was more concerned about pleasing God than he was about pleasing himself.",
        questionType: TypesOfQuestions.MCQ,
        choices: [
            "true",
            "false"
        ],
        correctChoice: ["true"],
        yourAnswer: ["true"],
        marks: 10,
        marksObtained: 10
    },
    {
        id: 5,
        question: "Which of these mountains are located in Nepal?",
        questionType: TypesOfQuestions.MCQ_CHOOSE_ALL,
        choices: [
            "Everest", "Annapurna", "K2", "Ama Dablan", "Kailash Parbat"
        ],
        correctChoice: ["Everest", "Annapurna", "Ama Dablan"],
        yourAnswer: ["Everest", "Annapurna", "K2"],
        marks: 10,
        marksObtained: 7
    },
    {
        id: 6,
        question: "When God accepted Abel's offering and rejected Cain's, Cain . . . .",
        questionType: TypesOfQuestions.MCQ,
        choices: [
            "congratulated Abel",
            "prayed to God",
            "became angry"
        ],
        correctChoice: ["became angry"],
        yourAnswer: ["became angry"],
        marks: 10,
        marksObtained: 10
    },
    {
        id: 7,
        question: "How many of these cities are located in India?",
        questionType: TypesOfQuestions.MCQ_CHOOSE_ALL,
        choices: [
            "Mumbai", "Tashkent", "Kolkata", "Tiblisi"
        ],
        correctChoice: ["Mumbai", "Kolkata"],
        yourAnswer: ["Mumbai", "Tiblisi"],
        marks: 10,
        marksObtained: 5
    },
    {
        id: 8,
        question: "Cain was the first person in history to . . . .",
        questionType: TypesOfQuestions.MCQ,
        choices: [
            "offer an animal sacrifice",
            "kill another human being",
            "sin against God"
        ],
        correctChoice: ["kill another human being"],
        yourAnswer: ["kill another human being"],
        marks: 10,
        marksObtained: 10
    },
    {
        id: 9,
        question: "Abel offered an animal sacrifice because he . . . .",
        questionType: TypesOfQuestions.MCQ,
        choices: [
            "understood the meaning of the sacrificial lamb",
            "wanted to please God",
            "was afraid of God's punishment"
        ],
        correctChoice: ["wanted to please God"],
        yourAnswer: ["was afraid of God's punishment"],
        marks: 10,
        marksObtained: 0
    },
    {
        id: 10,
        question: "What was wrong with Cain's gift to God?",
        questionType: TypesOfQuestions.QNA,
        yourAnswer: "Cain was selfish in gifting to god. He was being a cheapskeat and a total punk.",
        marks: 10,
        marksObtained: 8,
    },
    {
        id: 11,
        question: "Why was God pleased with Abel's offering?",
        questionType: TypesOfQuestions.QNA,
        yourAnswer: "Cain was selfish in gifting to god. He was being a cheapskeat and a total punk.",
        marks: 10,
        marksObtained: 7
    },
    {
        id: 12,
        question: "What did you learn in Lesson Four that was very important to you?",
        questionType: TypesOfQuestions.QNA,
        yourAnswer: "Cain was selfish in gifting to god. He was being a cheapskeat and a total punk.",
        marks: 10,
        marksObtained: 8
    }
];


export const MockTestData = {
    testInstructions: MockTestInstructions,
    testQuestions: MockTestQuestions
}