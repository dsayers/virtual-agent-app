# IBM Watson Virtual Agent Chat Widget

## Prerequisites

##### Register for Watson Virtual Agent 
If you haven't already, you must register for a trial of [IBM® Watson™ Virtual Agent] (http://www.ibm.com/watson/developercloud/doc/virtual-agent/wva_getstart.shtml) in order to have access to the IBM® Watson™ Virtual Agent Chat Widget.

------------------------------------------

## Getting started

1. Clone this repository.
    1. If you don't already have Git installed, install [Git] (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
    2. Then run this command in your terminal: ```git clone git@github.ibm.com:watson-engagement-advisor/virtual-agent-app.git```
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
4. Paste these values into `botID`, `XIBMClientID`, and `XIBMClientSecret` accordingly (lines 153-155).
5. Save your changes.

**Important**: Keep the values of the IBMClientID and IBMClientSecret as private as possible.

------------------------------------------

## Configuring the Make a Payment Demo

In this step, you will invoke a client workspace that has a custom layout that changes how the **Make a Payment** intent interacts. This workspace can be used by multiple individuals at the same time. If you would like to set up and invoke your own workspace, perhaps so you can customize it further, scroll down to **Optional: Configure Your Own Environment** and follow the instructions there.

##### WVA Configure Tool
1. Navigate to your Watson™ Virtual Agent Configure tool.
    1. Log in to https://myibm.ibm.com/
    2. You should see **Products and services** in the center of the page. Click the **LAUNCH** button in the **Watson Virtual Agent Trial** tile.
    3. This opens a new tab in your browser which is your Watson™ Virtual Agent Configure tool.
2. In the WVA Configure tool, use the left column to navigate to **Configure**. In here, find and click on the **Make a Payment** intent.
3. Make sure the intent is set to **On** and then click **Change** under the IBM Content section. Change its **Response Type** to **Invoke client workspace**. Click **Continue**.
4. Click **Change** for each field and add the credentials accordingly as follows:
    1. **Conversation Endpoint** to `https://gateway.watsonplatform.net/conversation/api`. Click **Continue**.
    2. **Username** to `35e17536-dfb1-42fb-98ed-6ee9cc7478c2`. Click **Continue**.
    3. **Password** to `YWEn16N6VvR1`. Click **Continue**.
    4. **API Version** to `2016-07-11`. Click **Continue**.
    5. **Workspace ID** to `d6cd983a-acec-4ad8-bf51-7934a7f09101`. Click **Continue**.

Now the specific client workspace will be invoked when the Make a Payment intent is hit. 

If this is the only demo you wish to configure, scroll down to **Run the App** in this readme file and follow the steps in that section to start the app. Otherwise, continue with the follow section to setup further portions of the demo.

------------------------------------------

## Configuring the Update Address Demo

In this step, you will invoke a client workspace that has a custom layout that changes how the **Update Address** intent interacts. This workspace can be used by multiple individuals at the same time. If you would like to set up and invoke your own workspace, perhaps so you can customize it further, scroll down to **Optional: Configure Your Own Environment** and follow the instructions there.

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

If this is the only demo you wish to configure, scroll down to **Run the App** in this readme file and follow the steps in that section to start the app. Otherwise, continue with the follow section to setup further portions of the demo.

------------------------------------------

## Configuring the System of Records Integration

If you would like to set up your own Cloudant account, scroll down to **Optional: Configure Your Own Environment** and follow the instructions there. A preconfigured, shared database should be fine for demonstration purposes.

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

Scroll down to **Run the App** in this readme file and follow the steps in that section to start the app and get the port.

##### Add localtunnel URL to URL(s) field
We need a public url address to set up the server. You can use [localtunnel](https://localtunnel.github.io/www/) if you are testing locally. To do so, run the following commands in a separate terminal:

1. ```npm install -g localtunnel```
2. ```lt --port [yourPortNumber]```
    - Make sure the localtunnel is running on the same port as your express app and running in a separate terminal while you run your app.

3. By default, the endpoint `/slack` is exposed to accept messages from Slack, so your webhook url would look like this: ```http://your.localtunnelurl.me/slack```
4. Paste your localtunnel URL (i.e. http://your.localtunnelurl.me/slack) to the **URL(s)** field in the **Add Outgoing Webhooks Integration** page from earlier.
    - You will need to update the outgoing URL whenever you restart the server.
5. In the **Add Outgoing WebHooks Integration** page, scroll down and click **Save Settings**.

Now you can **Execute to a Human Agent**.

------------------------------------------

## Run the App
1. Install [**Node 6.x or higher**] (https://nodejs.org/en/) if you don't already have it.
2. Navigate to the corect directory by using the following command within the terminal:
    1. ```cd ./virtual-agent-app```
3. When you first set up the app, run the following commands once within the terminal:
    1. ```npm install browserify``` (you may have to use ```npm install -g browserify``` instead if that doesn't work)
    2. ```npm install```
4. Then, each time you want to run the app, use the following commands within the terminal:
    1. ```browserify public/js/main.js -o public/js/bundle.js```
    2. ```node app.js```
5. Then navigate to the port given in the terminal.

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

------------------------------------------- 


-------------------------------------------

## Optional: Configure Your Own Environment

### Invoke Your Custom Workspace

#### Prerequisites

##### Set Up an Account for Bluemix

Create a Bluemix account if you don't have one already.
    - [Sign up] (https://apps.admin.ibmcloud.com/manage/trial/bluemix.html?cm_mmc=WatsonDeveloperCloud-_-LandingSiteGetStarted-_-x-_-CreateAnAccountOnBluemixCLI) in Bluemix, or use an existing account. Your account must have available space for at least 1 app and 1 service.
    
##### Set Up a Conversation Service in Bluemix

If you haven't already create a Conversation Service in Bluemix in order to use a custom layout within your IBM® Watson™ Virtual Agent Chat Widget.

1. In Bluemix, navigate to your Dashboard.
2. If you do not already have a Conversation Service, or would like to use a separate instance of a Conversation Service for this project, click **USE SERVICES OR APIS**. 
3. Now find and click the **Conversation** icon. 
4. You then are brought to a page where you can **create** an instance of the Conversation Service. 
    1. In the right column of the page, under **App:** you can select **Leave unbound** since your instance of the Conversation Service does not need to be bound to your project. 
    2. You can make the **Service name** and the **Credential name** anything you prefer (these do not matter). 
    3. Last, select the **Free** plan of the Conservation service and click **CREATE** to make your instance of the service.

#### Invoke and Set Up Your Custom Workspace

In this step, you will invoke a client workspace that has a custom layout that changes how the **Make a Payment** intent interacts.

##### WVA Configure Tool
1. Navigate to your Watson™ Virtual Agent Configure tool.
    1. Log in to https://myibm.ibm.com/ and navigate to **Products and services**.
    2. This brings you to a new page. In this page, click the **LAUNCH** button in the **Watson Virtual Agent Trial** tile.
    3. This opens a new tab in your browser which is your Watson™ Virtual Agent Configure tool.
2. In the WVA Configure tool, use the left column to navigate to **Configure**. In here, find and click on the **Make a Payment** intent.
3. Make sure the intent is set to **On** and then click **Change** and change its **Response Type** to **Invoke client workspace**. Click **Continue**.
4. Change the following inputs using the more explicit directions below in **Create Custom Conversation Workspace**:
    1. **Conversation Endpoint**
    2. **Username**
    3. **Password**
    4. **API Version**
    5. **Workspace ID**

##### Create Custom Conversation Workspace
1. If you do not already have an instance of Conversation Service, scroll above to **Prerequisites** in this readme to get directions to do so.
2. In Bluemix, navigate to the Dashboard and click the instance of Conversation Service you want to use for this project.
3. This brings you to a new page. In this page, click the **Service Credentials** menu item. Copy these items into the configure tool under the **Make a Payment** intent:
    1. In your WVA Configure tool, click **Change** and change the **Conversation Endpoint** configure input to the **url** Conversation Service credential. Click **Continue**.
    2. In your WVA Configure tool, click **Change** and change the **Username** configure input to the **username** Conversation Service credential. Click **Continue**.
    3. In your WVA Configure tool, click **Change** and change the **Password** configure input to the **password** Conversation Service credential. Click **Continue**.
4. In your WVA Configure tool, click **Change** and change the **API Version** configure input to the **current version** found in http://www.ibm.com/watson/developercloud/conversation/api/v1/#authentication. Click **Continue**.
5. Back in the page where your Conversation Service credentials are located, click the **Manage** menu item in the left column and select **Launch Tooling**. This opens a new tab in your browser, where you are prompted to login if you have not done so before. Use your Bluemix credentials.
4. Click the import workspace button. Click **Choose a file** (or drag and drop) and select the JSON file (*wow_make_a_payment.json*) under **workspaces** in your project. Choose to **import Everything(Intents, Entities, and Dialog)**. Then select **Import** to finish importing the workspace.
5. Refresh your browser. A new workspace tile is created within the tooling. Select the menu button within the workspace tile, then select **View details**:
6. In the Details UI, copy the 36 character UNID **ID** field. This is the **Workspace ID**.
7. In your WVA Configure tool, click **Change** and change the **Workspace ID** configure input to the Workspace ID of your Conversation workspace (that you found in the previous step). Click **Continue**.

Now your client workspace has been invoked.

##### Results
Scroll to **Run the App** in this readme file and follow the steps in that section to start the app.
To see how the custom layout works within your app do the following:

1. In your running app (*the Telco demo webpage you are running locally*), navigate to **Support** and then to **Talk to Watson**. 
2. On this page, enter the message, `make a payment` or `pay`, into the chat bot (**"Enter message..."**).
3. You will then see a response of buttons (if you have a balance of more than $0 in the system of records). This is the custom layout that you added by invoking the client workspace.


### Set up a Cloudant account

1. Sign into your Cloudant Account.
    - If you don't already have one then, you can [Sign up] (https://cloudant.com/sign-up/) for Cloudant.
2. Create a database in your cloudant dashboard. You can do so by clicking on **Create Database** button the top right corner of your dashboard. 
3. Add your cloudant username, password and database name to the .env file located in the project folder

Scroll to **Run the App** in this readme file and follow the steps in that section to start the app.





