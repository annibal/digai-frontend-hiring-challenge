import { getRandomDistinctElements } from "@/utils/random";

const topFirstNames = [
  ...["James", "Mary", "Michael", "Patricia", "Robert", "Jennifer", "John", "Linda"],
  ...["Elizabeth", "William", "Barbara", "Richard", "Susan", "Joseph", "Jessica"],
  ...["Karen", "Christopher", "Sarah", "Charles", "Lisa", "Daniel", "Nancy", "Matthew"],
  ...["Anthony", "Betty", "Mark", "Ashley", "Donald", "Emily", "Steven", "Kimberly"],
  ...["Margaret", "Paul", "Donna", "Joshua", "Michelle", "Kenneth", "Carol", "Kevin"],
  ...["Brian", "Melissa", "Timothy", "Deborah", "Ronald", "Stephanie", "George"],
  ...["Jason", "Sharon", "Edward", "Laura", "Jeffrey", "Cynthia", "Ryan", "Dorothy"],
  ...["Amy", "Nicholas", "Kathleen", "Gary", "Angela", "Eric", "Shirley", "Jonathan"],
  ...["Stephen", "Brenda", "Larry", "Pamela", "Justin", "Nicole", "Scott", "Anna"],
  ...["Samantha", "Benjamin", "Katherine", "Samuel", "Christine", "Gregory"],
  ...["Alexander", "Rachel", "Patrick", "Carolyn", "Frank", "Janet", "Raymond"],
  ...["Jack", "Olivia", "Dennis", "Heather", "Jerry", "Helen", "Tyler", "Catherine"],
  ...["Diane", "Jose", "Julie", "Adam", "Victoria", "Nathan", "Joyce", "Henry"],
  ...["Zachary", "Kelly", "Douglas", "Christina", "Peter", "Ruth", "Kyle", "Joan"],
  ...["Virginia", "Ethan", "Judith", "Jeremy", "Evelyn", "Christian", "Hannah"],
  ...["Andrea", "Keith", "Megan", "Austin", "Cheryl", "Roger", "Jacqueline"],
  ...["Madison", "Sean", "Teresa", "Gerald", "Abigail", "Carl", "Sophia", "Dylan"],
  ...["Harold", "Sara", "Jordan", "Gloria", "Jesse", "Janice", "Bryan", "Kathryn"],
  ...["Ann", "Arthur", "Isabella", "Gabriel", "Judy", "Bruce", "Charlotte", "Logan"],
  ...["Billy", "Grace", "Joe", "Amber", "Alan", "Alice", "Juan", "Jean", "Elijah"],
  ...["Willie", "Frances", "Albert", "Danielle", "Wayne", "Marilyn", "Randy"],
  ...["Mason", "Beverly", "Vincent", "Diana", "Liam", "Brittany", "Roy", "Theresa"],
  ...["Kayla", "Caleb", "Alexis", "Bradley", "Doris", "Russell", "Lori", "Lucas"],
  ...["David", "Thomas", "Sandra", "Andrew", "Amanda", "Rebecca", "Jacob", "Emma"],
  ...["Brandon", "Debra", "Maria", "Aaron", "Lauren", "Noah", "Walter", "Terry"],
  ...["Martha", "Lawrence", "Julia", "Denise", "Natalie", "Bobby", "Davis"],
  ...["Anderson", "White", "Young", "Green", "Carter", "Edwards", "Rogers", "Howard"],
  ...["Wood", "Castillo", "Tiffany"],
];

const topLastNames = [
  ...["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller"],
  ...["Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzales", "Wilson"],
  ...["Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson"],
  ...["Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker"],
  ...["Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores"],
  ...["Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell"],
  ...["Roberts", "Gomez", "Phillips", "Evans", "Turner", "Diaz", "Parker", "Cruz"],
  ...["Collins", "Reyes", "Stewart", "Morris", "Morales", "Murphy", "Cook"],
  ...["Gutierrez", "Ortiz", "Morgan", "Cooper", "Peterson", "Bailey", "Reed", "Kelly"],
  ...["Ramos", "Kim", "Cox", "Ward", "Richardson", "Watson", "Brooks", "Chavez"],
  ...["James", "Bennet", "Gray", "Mendoza", "Ruiz", "Hughes", "Price", "Alvarez"],
  ...["Sanders", "Patel", "Myers", "Long", "Ross", "Jimenez"],
];

export function getListOfTargets(names: number = 100, lastNamesModifier: number = 1.6, maxLastNamesPerName: number = 4) {
  const firstNames = getRandomDistinctElements(topFirstNames, names);

  const countLastNames = Math.min(names * maxLastNamesPerName, names * lastNamesModifier);
  const lastNames = getRandomDistinctElements(topLastNames, countLastNames);
  console.debug({ firstNames: firstNames.slice(), lastNames: lastNames.slice(), names, n2: Math.floor(names * lastNamesModifier), lastNamesModifier, maxLastNamesPerName})

  const fullNames = firstNames.map((x) => [x]);

  let loopSafeGuard = names * lastNamesModifier * 3;
  // let strLName = "";
  // let idx = 0;
  while (loopSafeGuard-- > 0 && lastNames.length) {

    // if (lastNames.length > fullNames.length / lastNamesModifier) {
    //   idx = lastNames.length % firstNames.length;
    //   strLName = lastNames.splice(-1, 1)[0];
    //   console.log('strLName 1 :>> ', strLName);
    // } else {
    // }
    const idx = Math.floor(Math.random() * fullNames.length);
    const strLName = lastNames.splice(idx % lastNames.length, 1)[0];

    console.debug(`#${loopSafeGuard}: idx:${idx}, first:${fullNames[idx]}, last:${strLName}, last.len:${lastNames.length}, full.len:${fullNames.length}`)
    if (fullNames[idx].length > maxLastNamesPerName) {
      lastNames.push(strLName)
    } else {
      fullNames[idx].push(strLName);
    }
  }

  return fullNames.map((x) => x.join(" "));
}
