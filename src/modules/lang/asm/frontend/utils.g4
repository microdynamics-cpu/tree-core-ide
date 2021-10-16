lexer grammar utils;

DIRECTIVE: '.align' IMM
| '.file'  STRING
| '.global' SYMBOL_NAME
| '.local' SYMBOL_NAME
| '.comm'
| '.common'
| '.ident' STRING
| '.section'
| '.size'
| '.text'
| '.data'
| '.rodata'
| '.bss'
| '.string' STRING
| '.asciz' STRING
| '.equ'
| '.macro'
| '.endm'
| '.type'
| '.option'
| '.byte'
| '.2byte'
| '.half'
| '.short'
| '.4byte'
| '.word'
| '.long'
| '.8byte'
| '.dword'
| '.quad'
| '.dtprelword'
| '.dtpreldword'
| '.sleb128'
| '.uleb128'
| '.p2align'
| '.balign'
;

SYMBOL_NAME: (LETTER | '_')+;
LABEL: SYMBOL_NAME ':';
STRING: '"' .*? '"';

REG: (REGNUM | REGNAME);
REGNUM: 'x' (DIGIT | [1-2]DIGIT | '30' | '31');
REGNAME:
	'zero'
	| 'ra'
	| 'sp'
	| 'gp'
	| 'tp'
	| 'fp'
	| 'a' [0-7]
	| 's' [0-9]
	| 's10'
	| 's11'
	| 't' [0-6];

DIGIT: [0-9];
LETTER: [a-zA-Z];
IMM: DIGIT+;
NEWLINE: '\r'? '\n';
WS: [ \t]+ -> skip;