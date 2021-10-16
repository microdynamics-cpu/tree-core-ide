grammar riscv;

prog: inst;

// label: ID ':';
inst: r_type | i_type | s_type | b_type | u_type | j_type;

u_type: 'lui' | 'auipc';
j_type: 'jal';
b_type: 'beq' | 'bne' | 'blt' | 'bge' | 'bltu' | 'bgeu';
i_type: 'jalr';
s_type: 'sdfs';
r_type:
    'add' (REGNUM | REGNAME) ',' (REGNUM | REGNAME) ',' (
        REGNUM
        | REGNAME
    );

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
ID: [a-zA-Z]+;
INT: DIGIT+;
NEWLINE: '\r'? '\n';
WS: [ \t]+ -> skip;