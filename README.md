# AI-HCI-hw4 - HueShift

## Important: Challenges Faced during Development
While significant progress has been made in designing and conceptualizing HueShift, the coding part has presented some unforeseen challenges. Specifically, the volume of HTML and CSS data on modern webpages has proven to be a significant hurdle. Many websites, particularly those with complex layouts or dynamic content, generate HTML and CSS files that exceed several megabytes in size, sometimes containing millions of characters.
Example: the size of the output I got from https://mail.google.com/mail/u/0/#inbox was approximately 2.5 MB (check report for image). The output is just a small section of the CSS that contains very few color-related properties of only 10 types of HTML tags: main, nav, article, footer, header, div, p, span, a, img

Some of the challenges faced are:
•	API Limitations: LLMs, while powerful, have limitations on the amount of data they can handle in a single request (input and output) and sending multiple requests is very inefficient (both cost and browser performance). Example: Google Gemini 1.5 Flash can take 1,048,576 tokens and the output token limit is 8,192 [1]
•	Performance Bottlenecks: Sending and receiving large amounts of data to the LLM API led to performance delays in the browser and to the webpage. 

I am sure that there is a more efficient way to solve this problem like having more robust traversing and parsing algorithm to get the more relevant CSS tags and further reducing the data size, however, I was not able to do it due to time constraint. I have added my code to the GitHub repository. The algorithm I wrote was quite simple:
•	It traverses through the webpage’s DOM and looks for HTML tags that has specific color properties like “color”, “background-color” and “border-color”. 
•	It stores the values of the CSS properties and maps it to the HTML tags and its level in the DOM for the AI model to understand (example: in the above image, the starting characters say “level 0, tag:BODY”). 
•	It also adds custom IDs (eg: “ai-color-change-0” in the image) to those HTML tags so that it is easy for the new CSS (returned by the AI Model) to get mapped and reflect the changes.
Despite these challenges, the core concept of HueShift remains promising. By addressing these data handling issues, the project can move forward towards its goal of providing a valuable accessibility tool for individuals with color blindness.

I genuinely believed my approach could work and it could be a very decent product. So, I kept trying to optimize my algorithm, and hence could not think of any other solution for this assignment. 

References:
1. https://ai.google.dev/gemini-api/docs/models/gemini
