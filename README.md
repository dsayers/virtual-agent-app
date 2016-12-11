# IBM Watson Virtual Agent Chat Widget

## Introduction

This application demonstrates the capabilities of the [IBM® Watson™ Virtual Agent] and, in particular, shows how WVA can be customized and integrated with external systems.  Tech sellers will find this to be a compelling intial demo to either line of business or technical audiences. Though it can be deployed and run locally on a laptop, deploying this demo on [IBM® Bluemix™] offers several significant conveniences. This README file gives instructions for deploying this application on Bluemix.

This application is a derivative work of [this application] (https://github.ibm.com/watson-engagement-advisor/virtual-agent-app). An enhanced 'update address' scenario was added.

------------------------------------------

## Prerequisites

##### Register for Watson Virtual Agent 
If you haven't already, you must register for a trial of [IBM® Watson™ Virtual Agent] (http://www.ibm.com/watson/developercloud/doc/virtual-agent/wva_getstart.shtml) in order to have access to the IBM® Watson™ Virtual Agent Chat Widget.

##### Set Up an Account for Bluemix
Use an existing one or create an account for [IBM® Bluemix™] (https://apps.admin.ibmcloud.com/manage/trial/bluemix.html?cm_mmc=WatsonDeveloperCloud-_-LandingSiteGetStarted-_-x-_-CreateAnAccountOnBluemixCLI). Your account must have available space for at least 1 app.
    
##### Node
Install [**Node 6.x or higher**] (https://nodejs.org/en/) if you don't already have it. You will use this when configuring the demo to point to your own WVA and Slack channel.

##### Cloud Foundry Command Line Interface
Install [**Cloud Foundry CLI**] (https://docs.cloudfoundry.org/cf-cli/install-go-cli.html) if you don't already have it.  You will use this to push your configured demo to Bluemix.

------------------------------------------

## Getting started

1. Clone this repository.
    1. If you don't already have Git installed, install [Git] (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
    2. Open a GIT shell window
    3. Navigate to or create a directory where you want to unpack the repository files, e.g. ```/virtual-agent-app```
    4. Then run this command in your terminal: ```git clone https://github.com/dsayers/virtual-agent-app.git```
2. Get your API keys. To prove that you have permission to use the Watson Virtual Agent API services as a trial user, the following keys must be associated with any API calls that are made to the service from the virtual agent user interface: Client ID and Client secret token.
    1. Log in to [/api explorer](https://developer.ibm.com/api/) with the same IBM ID that you used to sign up for the trial subscription.
    2. Create a user name, and click **Next**.
    3. Click the **My APIs** link, and look for the IBM Watson Virtual Agent tile.
    4. Click the key icon, and select the default key. Two keys are automatically generated.
    5. Hover over the key fields, and click **Show**.
    6. Copy these key values and paste them in a text file for now so that you can add them to a file later. The value from the first field is the client ID key. The value from the second field is the client secret token.
      - Also, make sure to copy & paste these key values separately, or your client secret token may appear as  `abcdefghijklmnopqrstuvwxyz` due to security features.
3. Get your bot ID.
    1. Click the IBM Watson Virtual Agent tile.
    2. Click **KEYS**, and click to select the default key (if you do not select the default key, you will not be able to see the **TEST** button later to come).
    3. Scroll down to the **Retrieve bot** call.
    4. Add '2016-09-16' as the version parameter value, and click **TEST**.
    5. Copy the `bot_id`, the 32-digit alphanumeric code, that is returned in the response and paste it in a text file because you will need it later.
3. Open `public/js/main.js` in your favorite text editor so that you can paste values for the `botID`, `XIBMClientID`, and `XIBMClientSecret` parameters.
4. Find where these bot settings are assigned (lines 175-177) and paste your values for `botID`, `XIBMClientID`, and `XIBMClientSecret` over top the existing values.
5. Save your changes.

**Important**: Keep the values of the IBMClientID and IBMClientSecret as private as possible.

------------------------------------------

## Configuring the Update Address Demo

Configuring this customization enables you to show how WVA can integrate with external systems of record. Address updates made using the WVA will also update the user's address in an external "CRM" system. You'll find instructions for how to best show this integration in the separately published demo script. (Include pointer to document or blog posting.)

In this step, you will invoke a client workspace that has a custom layout that changes how the **Update Address** intent interacts. This workspace can be used by multiple individuals at the same time. You can also set up and invoke your own workspace, perhaps so you can customize it further, but those steps are not documented in this README.

##### WVA Configure Tool
1. Navigate to your Watson™ Virtual Agent Configure tool.
    1. Log in to https://myibm.ibm.com/
    2. You should see **Products and services** in the center of the page. Click the **LAUNCH** button in the **Watson Virtual Agent Trial** tile.
    3. This opens a new tab in your browser which is your Watson™ Virtual Agent Configure tool.
2. In the WVA Configure tool, use the left column to navigate to **Configure**. In here, find and click on the **Update Address** intent.
3. Make sure the intent is set to **On** and then click **Change** under the IBM Content section. Change its **Response Type** to **Invoke client workspace**. Click **Continue**.
4. Click **Change** for each field and add the credentials accordingly as follows:
    1. **Conversation Endpoint** to `https://gateway.watsonplatform.net/conversation/api`. Click **Continue**.
    2. **Username** to `35e17536-dfb1-42fb-98ed-6ee9cc7478c2`. Click **Continue**.
    3. **Password** to `YWEn16N6VvR1`. Click **Continue**.
    4. **API Version** to `2016-07-11`. Click **Continue**.
    5. **Workspace ID** to `d6cd983a-acec-4ad8-bf51-7934a7f09101`. Click **Continue**.

Now the specific client workspace will be invoked when the Update Address intent is hit. 

------------------------------------------

## Configuring the Make a Payment Demo

Configuring this customization enables you to show how WVA can change values in external systems of record. As the user makes payments, his balance is updated and persisted in the system of record for his account.

In this step, you will invoke a client workspace that has a custom layout that changes how the **Make a Payment** intent interacts. This workspace can be used by multiple individuals at the same time. You can also set up and invoke your own workspace, perhaps so you can customize it further, but those steps are not documented in this README.

##### WVA Configure Tool
1. Navigate to your Watson™ Virtual Agent Configure tool.
    1. Log in to https://myibm.ibm.com/
    2. You should see **Products and services** in the center of the page. Click the **LAUNCH** button in the **Watson Virtual Agent Trial** tile.
    3. This opens a new tab in your browser which is your Watson™ Virtual Agent Configure tool.
2. In the WVA Configure tool, use the left column to navigate to **Configure**. In here, find and click on the **Make a Payment** intent.
3. Make sure the intent is set to **On** and then click **Change** under the IBM Content section. Change its **Response Type** to **Invoke client workspace**. Click **Continue**.
4. Click **Change** for each field and add the credentials accordingly as follows:
    1. **Conversation Endpoint** to `https://gateway.watsonplatform.net/conversation/api`. Click **Continue**.
    2. **Username** to `e28a8b8e-8ea0-45ae-b5e7-6832216c6d77`. Click **Continue**.
    3. **Password** to `nBaSsF4eRqxH`. Click **Continue**.
    4. **API Version** to `2016-07-11`. Click **Continue**.
    5. **Workspace ID** to `1e59184e-7bf7-4474-ae14-f67e2adfc506`. Click **Continue**.

Now the specific client workspace will be invoked when the Make a Payment intent is hit. 

------------------------------------------

## Configuring the Escalate to Agent Demo
##### Slack Setup
1. Create a [Slack Team] (https://get.slack.help/hc/en-us/articles/206845317-Create-a-Slack-team).
    - You must be an admin in your Slack team to set up Slack integration for your team.

##### Add incoming webhooks
Incoming webhooks are used for forwarding messages *from* the chat widget *to* the Slack channel. Here are the steps to set it up.

1. Add a new incoming webhook [integeration](https://my.slack.com/services/new/incoming-webhook/) to your team.
2. Choose a channel from the drop down list to where the bot will post messages and click **Add Incoming WebHooks Integration** button
3. Copy the **Webhook URL** and paste it to your .env file and save. ```SLACK_INCOMING_WEBHOOK=<Your webhook>```
4. In the **Add Incoming WebHooks Integration** page, scroll down and click **Save Settings**.

##### Add outgoing webhooks
Outgoing webhooks are used for forwarding messages *from* the Slack channel *to* the chat widget.

1. Add a new outgoing webhook [integration](https://my.slack.com/services/new/outgoing-webhook) to your team.
2. Click **Add Outgoing Webhooks Integration**
3. Scroll down to 'Integration Settings' and select the **Channel** you want to listen on from the drop down menu. Optionally, you can add trigger words as well.
4. Copy the **Slack Token** and paste it to the .env file and save. ```SLACK_OUTGOING_TOKEN=<Your token>```

After you push this application to Bluemix, you will have to do one more thing to complete the configuration of the Escalate to Agent demo.

------------------------------------------

## Prepare the App to be pushed to Bluemix
1. Get to a command line on your computer (e.g. open a command or terminal window)
2. Navigate to the directory where you cloned the Git repository:
    1. e.g. ```cd /virtual-agent-app```, unless you chose a different location
3. Run the following commands once within the terminal:
    1. ```npm install browserify``` (you may have to use ```npm install -g browserify``` instead if that doesn't work)
    2. ```npm install```
    3. ```browserify public/js/main.js -o public/js/bundle.js```

------------------------------------------

## Push App to Bluemix
From the command line while still positioned in the directory where you cloned the Git repository

1. Enter this command subsituting in the user name of the IBM_Id associated with your Bluemix account, usually your e-mail address
    1 ```cf login -a https://api.ng.bluemix.net -u <your_ibm_id_username>```
2. Enter your (ibm_id) password when prompted
3. Select an organization from the list presented. (Note: if you only access to only one organization the system may bypass this step and proceed from the next one.)
4. Enter this command substituting in the name want to give your application on Bluemix. Remember the URL to reach your deployed app will be: <your_application_name>.mybluemix.net. Because URL's must be unique, you will get a message if the name you've selected is already being used. In that case, re-enter this command with different names until successful.
    1. ```cf push <your_application_name>```
5. Look for the message indicating the deployed app is running. (Deployment may take a few minutes.)

------------------------------------------

## Configuring the Escalate to Agent Demo (Part 2)
##### Update outgoing webhooks

1. Update the new outgoing webhook [integration](https://my.slack.com/services/new/outgoing-webhook) that you just created. (Click the pencil icon next to the appropriate configuration.)
2. By default, the endpoint `/slack` is exposed to accept messages from Slack, so update your webhook url to look like this: ```http://<your_application_name>.mybluemix.net/slack```
3. Paste your localtunnel URL (i.e. http://your.localtunnelurl.me/slack) to the **URL(s)** field in the **Add Outgoing Webhooks Integration** page from earlier.
4. In the **Add Outgoing WebHooks Integration** page, scroll down and click **Save Settings**.

Now you can **Execute to a Human Agent**.

-------------------------------------------

## Performing the Demos

** Please make sure you complete the flow for a specific message before typing in another message. For instance, if you type in `pay bill` into the chat widget, make sure you click the appropriate buttons and complete the dialog flow for the intent make-a-paymen before typing another message in the chat window. If you do not do this, utterances that are intended for the custom workspace will be handled incorrectly by the default IBM workspace. The virtual team is investigating this issue.

### Make a Payment demo
1. In your running app (*the Telco demo webpage you are running locally*), navigate to **Support** and then to **Talk to Watson**. 
2. On this page, enter the message, `make a payment` or `pay`, into the chat bot (**"Enter message..."**).
3. You will then see a response of buttons (if you have a balance of more than $0 in the system of records). This is the custom layout that you added by invoking the client workspace.

### Update Address demo
1. In your running app (*the Telco demo webpage you are running locally*), navigate to **Support** and then to **Talk to Watson**. 
2. On this page, enter the message, `update address`, into the chat bot (**"Enter message..."**).
3. You will then see a response of buttons asking if you would like to change your address. Click **Yes** if you want to change your address and a form will appear. 
4. Fill out the form and click **Submit**. 
5. Enter the message, `update address`, again into the chat bot (**"Enter message..."**), and notice that the response shows the new address you've recently added.

### Execute to Agent Demo

1. In order to execute to a human agent, make sure your Slack channel is open while your local tunnel and app are running as well. 
2. In your running app (*the Telco demo webpage you are running locally*), navigate to **Support** and then to **Talk to Watson**. 
3. On this page, enter the message, `agent`, into the chat bot (**"Enter message..."**). You then should notice that you will receive a Slack notification that a client (the user asking the chat bot questions in the running app) has executed to a human agent (the user in the Slack channel). 
4. In Slack, you can then enter a message (remember to include the trigger word(s) at the beginning if you have any) which will then appear in the running app. Thus, a conversation can occur between the client and the human agent. 
5. To end the conversation between the human agent and client, the human agent in the Slack channel can enter the word, `stop`. This will allow the client to continue to ask any more questions to the chat bot, rather than asking the human agent.
