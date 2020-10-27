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
      let choice = promptFor("Would you like to search by only a single trait?Enter 'yes' or 'no'", yesNo).toLowerCase();
        switch(choice){
        case 'yes':
          searchByTrait(people);
          break;
        case 'no':
          searchByTraits(people);
        }
      app(people)
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

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    displayPerson(person);
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
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
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
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
  return people;
}
function searchByTraits(people){
  let gender = promptFor("What is the person's gender?", chars);
  let dob = promptFor("What is the person's dob(mm/dd/yyyy)?", chars);
  let height = promptFor("What is the person's height?", chars);
  let weight = promptFor("What is the person's weight?", chars);
  let eyeColor = promptFor("What is the person's eye color?", chars);
  let occupation = promptFor("What is the person's occupation?", chars);

  let foundPeople = people.filter(function(person){
    if((person.gender === gender || gender == null)
      && (person.dob === dob || dob == null)
      && (person.height === height || height == null)
      && (person.weight === weight || weight == null)
      && (person.eyeColor === eyeColor || eyeColor == null)
      && (person.occupation === occupation || occupation == null)){
        return true;
      }
      else{
        return false;
      }
  })

  displayPeople(foundPeople);
}

function searchByGender(people){
  let gender = promptFor("What is the person's gender?", chars);

  let foundPeople = people.filter(function(person){
    if(person.gender === gender){
      return true;
    }
    else{
      return false;
    }
  })

  return foundPeople;
}

function searchByDOB(people){
  let dob = promptFor("What is the person's Date of Birth (mm/dd/yyyy)?", chars);

  let foundPeople = people.filter(function(person){
    if(person.dob === dob){
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
    if(person.eyeColor === eyeColor){
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
        if(person.height == height)
          {
          return true;
          }
        else
          {
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
        if(person.weight == parseInt(weight))
          {
          return true;
          }
        else
          {
            return false;
          }
      })
    return foundPerson;
}

function searchByOccupation(people){
  var input = promptFor("Select the person's occupation?\n1 Programmer\n2 Assistant\n3 Landscaper\n4 Nurse\n5 Student\n6 Architect\n7 Doctor\n8 Politician",int);
  var searchOccupation;

  switch(input){
    case 1:
      searchOccupation = "programmer";//
      break;
    case 2:
      searchOccupation = "assistant";//
      break;
    case 3:
      searchOccupation = "landscaper";//
      break;
    case 4:
      searchOccupation = "nurse";//
      break;
    case 5:
      searchOccupation = "student";//
      break;
    case 6:  
      searchOccupation = "architect";//
      break;
    case 7:
      searchOccupation = "doctor";//
      break;
    case 8:
      searchOccupation = "politician";//
      break;  

    default:
      alert("Please try again.");
      return searchByOccupation(people);
    

  }
  let results = people.filter(function(el){
    return el.occupation === searchOccupation
  });
   console.log(results);

   return results;

}
// alerts a list of people 
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}
function displayPeopleTest(people){
  let i=0;
  let continueLoop = true;

  while(people[i]&&continueLoop){
    let userResopnce = promptFor("Is " + people[i].firstName + " " + people[i].lastName + " the right person? Enter 'yes' or 'no'", yesNo).toLowerCase();
    if(userResopnce== "yes"){
        continueLoop = false;
        displayPerson(people[i]);
    }
    i++;
  }
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
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return typeof input == "string"|| input == "";
}
function int(input){

 return !isNaN(parseInt(input)|| input == "");
}
