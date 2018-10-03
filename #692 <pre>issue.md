First, You can try to use this one

<div style="white-space: pre-wrap;"> Added CSS styles to wrap the code
<code> 
              int a = 10;
              int b = 10;
              int d = 10;
</code>
</div>

Second, if you insist on using <pre> only and not <div> then,

<pre  style="white-space: pre-wrap; word-break: keep-all;">
<code> 
              int a = 10;
              int b = 10;
              int d = 10;
</code>
</pre>

Using this will allow a fixed size with horizontal scrolling for long lines, which I guess is good for a blog.
Just experiment with these and let me know!

pre { overflow: auto; }
