/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var IBMChat = require('@watson-virtual-agent/chat-widget')
var $ = require('jquery');

// Generate a unique id for this client
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

/**** HTML helper functions ****/
function show(shown, hidden) {
  document.getElementById(shown).style.display='block';
  document.getElementById(hidden).style.display='none';
}

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "block";
}

function showDiv(id) {
   var e = document.getElementById(id);
   e.style.display = 'block';
}

function hideDiv(id) {
   var e = document.getElementById(id);
   e.style.display = 'none';
}

$('#home').click(function() {
  show('Page1','Page2');
  hideDiv('ibm_el');
});
$('#contact').click(function() {
  show('Page2','Page1');
  showDiv('ibm_el');
});
$('#talktowatson').click(function() {
  show('Page2','Page1');
  showDiv('ibm_el');
});
/**** END HTML helper functions ****/

/**** Defining and calling a custom layout : payBalance ****/
function layoutInit() {
  IBMChat.subscribe('layout:payBalance', function(data) {
     var widget = new PayBalance(data);
  });
}

function PayBalance(data) {
  this.init(data);
}

PayBalance.prototype.init = function(data) {
  this.data = data;
  this.subscribeSend = IBMChat.subscribe('send', this.removeAllEventListeners.bind(this)); // when we send a message, lets remove all event listeners
  this.draw();
};

PayBalance.prototype.eventListeners = [];

// Draw buttons for payBalance layout
PayBalance.prototype.draw = function() {
  var data = this.data.message.inputvalidation.oneOf;
  var ids = this.data.message.inputvalidation.ids;
  for (var i = 0; i < data.length; i++) { // Go through each input validation within the node in the conversation workspace.
    var text = data[i];
    var button = document.createElement('button');
    button.textContent = text;
    button.setAttribute("id", ids[i]);
    button.setAttribute('data-input', text);
    button.setAttribute('style', 'display:block; margin: 0 auto; margin-top: 8px; margin-bottom: 8px; padding:4px; background:#9c27b0; color:#ffffff; border-radius: 3; width: 200px;');

    // If balance is $0, don't make buttons
    if (IBMChat.profile.get('bill_amount') == 0){
      this.data.msgElement.textContent = "You don't owe anything.";
      var data = {
        silent: true,
        text: "0"
      };
      IBMChat.publish('send', data);
    }

    // Don't show 30 button if the balance is less than or equal to $30
    else if (IBMChat.profile.get('bill_amount') > 20 && IBMChat.profile.get('bill_amount') <= 30){
      if (button.id !== "30"){
        this.data.layoutElement.appendChild(button); // Create button
        this.addListener(button);
      }
    }

    // Don't show $20 or $30 button if the balance is less than or equal to $20
    else if (IBMChat.profile.get('bill_amount') <= 20){
      if (button.id !== "20" && button.id !== "30"){
        this.data.layoutElement.appendChild(button); // Create button
        this.addListener(button);
      }

    // Show all buttons
    }else {
      this.data.layoutElement.appendChild(button); // Create button
      this.addListener(button);
    }
  }
};

PayBalance.prototype.handleClick = function() {
  var data = {
    silent: true,
    text: this.dataset.input
  };
  IBMChat.publish('send', data);
};

PayBalance.prototype.addListener = function(el) {
  el.addEventListener('click', this.handleClick);
  this.eventListeners.push(el); // add new event listener to array so we can loop through and delete later
};

//clean up event subscriptions and disable buttons
PayBalance.prototype.removeAllEventListeners = function() {
  if (this.eventListeners.length > 0) {
    for (var i = 0; i < this.eventListeners.length; i++) {
      this.eventListeners[i].removeEventListener('click', this.handleClick);
      this.eventListeners[i].setAttribute('disabled', true);
    }
    this.eventListeners = [];
    this.subscribeSend.remove(); //remove our subscription to the send event
  }
};

IBMChat.registerLayout('payBalance', layoutInit);

/**** END defining and calling a custom layout : payBalance ****/

//Initialting call to the chat-widget
IBMChat.init({
  el: 'ibm_el',
  baseURL: 'https://api.ibm.com/virtualagent/run/api/v1/',
  botID: '91c32f1f-e1b5-4271-b19b-678149c64a92',
  XIBMClientID: 'ebef051b-979d-4fb8-9342-16472d360a12',
  XIBMClientSecret: 'uA1rO5dD2tP5xW6sT7yF2dE4mS2aG8dU1mU4sG0oD0rX6hY8cU',
  styles: {
    background: '#f1f1f1',
    accentBackground: '#9c27b0', // The bars on the side of the text and under "Enter message"
    secondaryBackground: '#9c27b0', // Ex.) Enter a message, text box color of your message after it's sent
    text: '#000000', // Default text
    secondaryText: '#ffffff', // Ex.) Enter a message, the text color of your message after it's sent
    inputBackground: "#d8d8d8", // Ex.) Update email - click an option, input box color
    accentText: '#000000',  // Ex.) Update email - options' text color
    inputText: '#000000', // Ex.) Update email - click an option, input box, input text color
    link: '#9c27b0' // Ex.) locate store, enter zip code, links' color
  }
}).then(function(){
  IBMChat.profile.set('uuid', guid()); //Set temporary uuid for current session
  IBMChat.profile.set('bill_amount', (100).toString());
});

// Listen for post messages from Slack for its outgoing messages
var socket = io.connect('/');
socket.on('slackMessage', function(data) {
  if (data.text == '!Q@W#E$R') {
    IBMChat.disableCustomInputHandler(); // return control to virtual agent
    IBMChat.receive('Conversation with the live agent ended');
  }
  else
    IBMChat.receive(data.text);
});

// Escate to agent intent triggered
IBMChat.subscribe('action:agent', function(data) {
  httpPostAsync('/agent/' + IBMChat.profile.get('uuid'), {
      text:'Agent has been requested',
      data: data.message.data
    }, function(err, response) {
      if (err) {
        IBMChat.receive('I\'m sorry, there was an error connecting to an agent.');
      } else {
        IBMChat.enableCustomInputHandler({
          callback: function(message, resolve, reject) {
            httpPostAsync('/agent/' + IBMChat.profile.get('uuid'), { text: message } , function(err, response) {
              if (err) reject();
              else resolve();
            });
            // reject(error); if there are errors
          }
        });
      }
    }
  );
});

/*** Subscription method used by IBM Content ***/
// This subscription method is used when IBM Content is used in Virtual Agent Config Tool
IBMChat.subscribe('action:getUserProfileVariables', function(data) {
  IBMChat.sendSilently('success');
});

// Retrieve the address from the 'crm' application
IBMChat.subscribe('action:getCrmAddresses', function(data) {
  httpGetAsync('/getCrmAddress/' + window.document.getElementById("account-user-id").value + '/' + window.document.getElementById("account-user-email").value, function(response) {
    var crm_addresses = JSON.parse(response);
    IBMChat.profile.set('billing_address_line_1', crm_addresses.billing_address.address_line_1);
    IBMChat.profile.set('billing_address_line_2', crm_addresses.billing_address.address_line_2);
    IBMChat.profile.set('billing_city', crm_addresses.billing_address.city);
    IBMChat.profile.set('billing_state', crm_addresses.billing_address.state);
    IBMChat.profile.set('billing_zip', crm_addresses.billing_address.zip);
    IBMChat.profile.set('mailing_address_line_1', crm_addresses.mailing_address.address_line_1);
    IBMChat.profile.set('mailing_address_line_2', crm_addresses.mailing_address.address_line_2);
    IBMChat.profile.set('mailing_city', crm_addresses.mailing_address.city);
    IBMChat.profile.set('mailing_state', crm_addresses.mailing_address.state);
    IBMChat.profile.set('mailing_zip', crm_addresses.mailing_address.zip);
    IBMChat.sendSilently('success');
  });
});

/*** Subscription method used by IBM Content ***/
// Update the address in the database when updateAddress intent is triggered
IBMChat.subscribe('action:updateAddress', function(data) {
  var address = getUserProfile();
  var crm_address = {
    address_line_1: address.user_street_address1,
    address_line_2: address.user_street_address2,
    city:  address.user_locality,
    state: address.user_state_or_province,
    zip: address.user_zipcode
  };
  var address_type = data.message.action.value;
  IBMChat.profile.set('address_type', address_type)
  httpPostAsync('/updateCrmAddress/' + window.document.getElementById("account-user-id").value + '/' + window.document.getElementById("account-user-email").value + '/' + address_type, crm_address, function(response) {
//		IBMChat.sendSilently('success');
  });
});

function getCrmAddressProfile() {
	var crm_address = {
    billing_address_line_1: IBMChat.profile.get('billing_address_line_1'),
    billing_address_line_2: IBMChat.profile.get('billing_address_line_2'),
    billing_city: IBMChat.profile.get('billing_city'),
    billing_state: IBMChat.profile.get('billing_state'),
    billing_zip: IBMChat.profile.get('billing_zip'),
    mailing_address_line_1: IBMChat.profile.get('mailing_address_line_1'),
    mailing_address_line_2: IBMChat.profile.get('mailing_address_line_2'),
    mailing_city: IBMChat.profile.get('mailing_city'),
    mailing_state: IBMChat.profile.get('mailing_state'),
    mailing_zip: IBMChat.profile.get('mailing_zip')
  };
  return crm_address;
}

/*** Subscription method used by custom workspace ***/
// Pay the bill and update account balance in database when payBillAmount intent is detected
IBMChat.subscribe('action:payBillAmount', function(data) {
  var billAmount = data.message.action.value;
  payAmount(billAmount);
  IBMChat.sendSilently('success');
});

// Function that computes the remaining account balance and posts it to the database
function payAmount(billAmount) {
  if (billAmount == "full") {
    IBMChat.profile.set('bill_amount', '0');
  } else {
    var bill = IBMChat.profile.get('bill_amount');
    var billAmountInt = parseInt(billAmount);
    IBMChat.profile.set('bill_amount', (bill-billAmountInt).toString());
  }
  var record = getUserProfile();
  httpPostAsync('/updateRecord/' + IBMChat.profile.get('uuid'), record, function(err, response) {
    if (err) IBMChat.receive('There was an error updating the bill.');
  });

}

// Get the user profile for the current user
function getUserProfile() {
  var record = {
    "first_name": IBMChat.profile.get('first_name'),
    "last_name": IBMChat.profile.get('last_name'),
    "user_street_address1": IBMChat.profile.get('user_street_address1'),
    "user_street_address2": IBMChat.profile.get('user_street_address2'),
    "user_locality": IBMChat.profile.get('user_locality'),
    "user_state_or_province": IBMChat.profile.get('user_state_or_province'),
    "user_zipcode": IBMChat.profile.get('user_zipcode'),
    "bill_amount": IBMChat.profile.get('bill_amount'),
    "payment_due_date": IBMChat.profile.get('payment_due_date')
  };
  return record;
}

// Set the user profile for the current user
function setUserProfile(record) {
  IBMChat.profile.set('first_name', record.first_name);
  IBMChat.profile.set('last_name', record.last_name);
  IBMChat.profile.set('user_street_address1', record.user_street_address1);
  IBMChat.profile.set('user_street_address2', record.user_street_address2);
  IBMChat.profile.set('user_locality', record.user_locality);
  IBMChat.profile.set('user_state_or_province', record.user_state_or_province);
  IBMChat.profile.set('user_zipcode', record.user_zipcode);
  IBMChat.profile.set('bill_amount', record.bill_amount);
  IBMChat.profile.set('payment_due_date', record.payment_due_date);
}

// Generate a sample record to carry out appropriate actions during the demo
function generateSampleRecord() {
  var firstNames = Array('John', 'Nathan', 'Ashley', 'Becca');
  var lastNames = Array('Smith', 'Brown', 'Lobo', 'Cook');
  var usersStreetAddress1 = Array('Astor Place', 'Astor Place', 'Astor Place', 'Astor Place');
  var usersStreetAddress2 = Array('51', '51', '51', '51');
  var usersLocality = Array('New York', 'New York', 'New York', 'New York');
  var usersStateOrProvince = Array('NY', 'NY', 'NY', 'NY');
  var usersZipcode = Array('10003', '10003', '10003', '10003');
  var billAmounts = Array('50', '50', '50', '50');
  var paymentDueDates = Array('10/27/2016', '1/27/2017', '11/27/2016', '12/27/2016');
  var index = Math.floor(Math.random() * firstNames.length);
  var record = {
    "first_name": firstNames[index],
    "last_name": lastNames[index],
    "user_street_address1": usersStreetAddress1[index],
    "user_street_address2": usersStreetAddress2[index],
    "user_locality": usersLocality[index],
    "user_state_or_province": usersStateOrProvince[index],
    "user_zipcode": usersZipcode[index],
    "bill_amount": billAmounts[index],
    "payment_due_date": paymentDueDates[index]
  };
  return record;
}

// Function to make GET request
function httpGetAsync(url, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4) {
      if (xmlHttp.status == 200) {
        callback(xmlHttp.responseText);
      } else {
        callback({err: xmlHttp.statusText})
      }

    }
  }
  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
}

// Function to make POST request
function httpPostAsync(url, data, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('POST', url, true); // true for asynchronous
  xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4) {
      if (xmlHttp.status == 200) {
        callback(null, xmlHttp.responseText);
      }
      else {
        callback(xmlHttp.statusText, null);
      }
    }
  }
  xmlHttp.send(JSON.stringify(data));
}
