# Angular HTML Parser for performing regex on simple text, but excluding HTML tags
An experimental basic HTML parser, in Angular Filter format, that performs regex only on non-html text in a block.
Separates HTML tags from normal text, and sends the normal text to be filtered.
The filters have project-specific regex rules, but that external filter could do anything that you want to do to the normal text. 
This filter was working quite well for a Wordpress database with corrupted characters. It was replacing the characters as intended, but leaving all HTML, including embed tags, in proper functioning order.
