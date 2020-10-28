"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      let choice = promptFor("Would you like to search by only a single trait? Enter 'yes' or 'no'", yesNo).toLowerCase();
        switch(choice){
        case 'yes':
          searchByTrait(people);
          break;
        case 'no':
          searchByTraits(people);
          break;
        }
      break;
      default:
        app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'").toLowerCase();

  switch(displayOption){
    case "info":
      // TODO: get person's info
      displayPerson(person);
      break;
    case "family":
      // TODO: get person's family
      getFamily(person,people);
      break;
    case "descendants":
      // TODO: get person's descendants
      getDescendants(person,people);
      app(people);
      break;
    case "restart":
      app(people); // restart
      break;
      case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars).toLowerCase();
  let lastName = promptFor("What is the person's last name?", chars).toLowerCase();

  let foundPerson = people.filter(function(person){
    if(person.firstName.toLowerCase() === firstName && person.lastName.toLowerCase() === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson[0];
}
function searchByTrait(people){
  
  let result = [];
   var input = promptFor("Please enter: \n1 Gender \n2 Date of birth \n3 Height \n4 Weight \n5 Eye Color \n 6 Occupation",int);
   switch(parseInt(input)){
    case 1:
      people = searchByGender(people);
      break;
    case 2:
      people = searchByDOB(people);
      break;
    case 3:
      people = searchByHeight(people);
      break;
    case 4:
      people = searchByWeight(people);
      break;
    case 5:
      people = searchByEyeColor(people);
      break;
    case 6:
      people = searchByOccupation(people);
      break;
    default:
      alert("Please try again.");
      break;
      
   }
  return displayPeople(people);
}

// function searchByTraits(people){
//   let gender = promptFor("What is the person's gender? Press Enter to skip.", chars);
//   let dob = promptFor("What is the person's dob(mm/dd/yyyy)? Press Enter to skip.", chars);
//   let height = promptFor("What is the person's height? Press Enter to skip.", chars);
//   let weight = promptFor("What is the person's weight? Press Enter to skip.", chars);
//   let eyeColor = promptFor("What is the person's eye color? Press Enter to skip.", chars);
//   let occupation = promptFor("What is the person's occupation? Press Enter to skip.", chars);

//   let foundPeople = people.filter(function(person){
//     if((person.gender === gender || gender == null)
//       && (person.dob === dob || dob == null)
//       && (person.height === height || height == null)
//       && (person.weight === weight || weight == null)
//       && (person.eyeColor === eyeColor || eyeColor == null)
//       && (person.occupation === occupation || occupation == null)){
//         return true;
//       }
//       else{
//         return false;
//       }
//   })

//   displayPeople(foundPeople);
// }

function searchByTraits(people){
  let gender = searchByGender(people);
  let dob = searchByDOB(gender);
  let height = searchByHeight(dob);
  let weight = searchByWeight(height);
  let eyeColor = searchByEyeColor(weight);
  let results = searchByOccupation(eyeColor);

  displayPeople(results);
}


function searchByGender(people){
  let gender = promptFor("What is the person's gender?", chars);

  let foundPeople = people.filter(function(person){
    if(person.gender === gender || gender == null){
      return true;
    }
  })
  return foundPeople;
}

function searchByDOB(people){
  let dob = promptFor("What is the person's Date of Birth (mm/dd/yyyy)?", chars);

  let foundPeople = people.filter(function(person){
    if(person.dob === dob || dob == null){
      return true;
    }
    else{
      return false;
    }
  })

  return foundPeople;
}

function searchByEyeColor(people){
  let eyeColor = promptFor("What is the person's eye color?", chars);
  let foundPeople = people.filter(function(person){
    if(person.eyeColor === eyeColor || eyeColor == null){
      return true;
    }
    else{
      return false;
    }
  })
   return foundPeople;
}

function searchByHeight(people)
{
  let height = promptFor("What is the person's height in inches?",int)
      let foundPerson = people.filter(function(person)
      {
        if(person.height == height || height == null){
          return true;
          }
        else{
            return false;
          }
      })
    return foundPerson;
}

function searchByWeight(people)
{
  let weight = promptFor("What is the person's weight in inches?",int)
      let foundPerson = people.filter(function(person)
      {
        if(person.weight == parseInt(weight) || weight == null){
          return true;
          }
        else{
            return false;
          }
      })
    return foundPerson;
}

function searchByOccupation(people){
  var input = promptFor("Select the person's occupation?\nProgrammer\nAssistant\nLandscaper\nNurse\nStudent\nArchitect\nDoctor\nPolitician",chars);
  var searchOccupation;

  switch(input){
    case "1":
      searchOccupation = "programmer";//
      break;
    case "2":
      searchOccupation = "assistant";//
      break;
    case "3":
      searchOccupation = "landscaper";//
      break;
    case "4":
      searchOccupation = "nurse";//
      break;
    case "5":
      searchOccupation = "student";//
      break;
    case "6":  
      searchOccupation = "architect";//
      break;
    case "7":
      searchOccupation = "doctor";//
      break;
    case "8":
      searchOccupation = "politician";//
      break;  
    case null:
      searchOccupation = null;
      break;
    default:
      alert("Please try again.");
      return searchByOccupation(people);
  }
  let results = people.filter(function(el){
    if(el.occupation === searchOccupation || searchOccupation == null){
    return true;
    }
    else{
      return false;
    }
  });
   console.log(results);

   return results;

}
// alerts a list of people 
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
  choosePerson(people);
}
function displaystring(string){
  alert(string.map(function(string){
    return string;
  }).join("\n"));
}

function choosePerson(people){
  let i=0;
  let continueLoop = true;

  while(people[i]&&continueLoop){
    let userResopnce = promptFor("Is " + people[i].firstName + " " + people[i].lastName + " the right person? Enter 'yes' or 'no'", yesNo).toLowerCase();
    if(userResopnce== "yes"){
        continueLoop = false;
        mainMenu(people[i],people);
    }
    i++;
  }
}
 
 

function getDescendants(person, people){
 let allDescendants = [];
  allDescendants = checkDescendants(person);
 function checkDescendants(person){
 let results = people.filter(function(descendant){
   if (descendant.parents.includes(person.id)){
     let recursiveDescendant = checkDescendants(descendant);
     allDescendants.push(descendant);
     return true;
   }
   else{
     return false;
   }
 })
 return allDescendants;
}
 displayPeople(allDescendants);
}


function getFamily(person, people) {
  let getSpouse = [];
  let getParent = [];
  let getChild = [];
  let getSiblingParent1 = [];
  let getSiblingParent2 = [];
  let familyArray = [];

  if(person.currentSpouse >0){
    getSpouse = people.filter(function (p) {
      if(person.currentSpouse === p.id) {
        return true;
      }	
    });
  }
  if(person.parents.length > 0){
    getParent = people.filter(function (p) {
      if(person.parents[0] === p.id || person.parents[1] === p.id) {
        return true;
      }
    });
  } 
  getChild = people.filter(function (p) {
		if(person.id === p.parents[0] || person.id === p.parents[1] ) {
			return true;
		}
  });
  if(person.parents.length === 1){
    getSiblingParent1 = people.filter (function (p) {
      if(person.id === p.id){
        return false;
      }
      else if(person.parents[0] === p.parents[0] || person.parents[0] === p.parents[1]){
          return true;
      }
    });
  }
  if(person.parents.length > 1){
    getSiblingParent2 = people.filter (function (p) {
      if(person.id === p.id){
        return false;
      }
      else if(person.parents[1] === p.parents[0] || person.parents[1] === p.parents[1]){
          return true;
      }
    });
  }
  familyArray =familyArrayString(getSpouse,"Spouse").concat(familyArrayString(getParent,"Parent"),familyArrayString(getChild,"Child"),familyArrayString(getSiblingParent1,"Sibling"),familyArrayString(getSiblingParent2,"Sibling"));
  displaystring(familyArray);
}

function familyArrayString(people,familyMember){
  let i=0;
  let result =[];
    while(people[i]){
      result.push(people[i].firstName+" "+people[i].lastName+" - "+familyMember);
      i++;
    }
  return result;
}


function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "D.O.B: " + person.dob + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question)?.trim();
    if (response === ""){
      return null
    }
  } while(!response || !valid(response));
  return response.toLowerCase();
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return isNaN(input)|| input == "";
}
function int(input){
 return !isNaN(input)|| input == "";
}
