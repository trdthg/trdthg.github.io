set nocompatible
syntax on
" 相对行号
set relativenumber
" 自动删除空格
autocmd BufWritePre * :%s/\s\+$//e
" 主题配置 vim-airline
let g:airline#extensions#tabline#enabled = 1
let g:airline_theme = 'durant'
let g:airline_powerline_fonts = 1
" 替换掉闪瞎眼的弹出菜单初始配色
highlight Pmenu ctermbg=gray guibg=darkgray
highlight PmenuSel ctermbg=darkcyan guibg=darkcyan
highlight Normal ctermbg=black guibg=black
" 每 5 秒自动保存
set updatetime=5000

call plug#begin()
" 语法提示
Plug 'scrooloose/syntastic'
" coc
Plug 'neoclide/coc.nvim', {'branch': 'release'}
Plug 'honza/vim-snippets'
" 主题
Plug 'joshdick/onedark.vim'
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'

" json插件
Plug 'elzr/vim-json'
" 高亮
Plug 'sheerun/vim-polyglot'
call plug#end()

"
set hidden

" tab空格数量
set tabstop=4
set softtabstop=4
set shiftwidth=4
"用space替代tab的输入
set expandtab

set showmatch
set number

set encoding=utf-8
set autoread "文件被改动后自动载入

" 自动补全

" Some servers have issues with backup files, see #649.
set nobackup
set nowritebackup

" Give more space for displaying messages.
set cmdheight=1

" Having longer updatetime (default is 4000 ms = 4 s) leads to noticeable
" delays and poor user experience.
set updatetime=300

" Don't pass messages to |ins-completion-menu|.
set shortmess+=c

"Use 24-bit (true-color) mode in Vim/Neovim when outside tmux.
"If you're using tmux version 2.2 or later, you can remove the outermost $TMUX check and use tmux's 24-bit color support
"(see < http://sunaku.github.io/tmux-24bit-color.html#usage > for more information.)
if (empty($TMUX))
  if (has("nvim"))
    "For Neovim 0.1.3 and 0.1.4 < https://github.com/neovim/neovim/pull/2198 >
    let $NVIM_TUI_ENABLE_TRUE_COLOR=1
  endif
  "For Neovim > 0.1.5 and Vim > patch 7.4.1799 < https://github.com/vim/vim/commit/61be73bb0f965a895bfb064ea3e55476ac175162 >
  "Based on Vim patch 7.4.1770 (`guicolors` option) < https://github.com/vim/vim/commit/8a633e3427b47286869aa4b96f2bfc1fe65b25cd >
  " < https://github.com/neovim/neovim/wiki/Following-HEAD#20160511 >
  if (has("termguicolors"))
    set termguicolors
  endif
endif
" colorscheme onedark
