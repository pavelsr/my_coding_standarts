---
---

# Atom

## Быстрые клавиши

Ctrl+Shift+P - Command Palette

## Список полезных плагинов

http://atom.io/packages/copy-path удобное копирование путей

https://atom.io/packages/git-blame

https://atom.io/packages/structure-view ( плагин от Alibaba, запускается по Сtrl+O, основан на ctags )

https://atom.io/packages/symbols-view ( Генерация: `ctags --language-force=Perl -R .` )

https://github.com/danielbrodin/atom-project-manager (alt-shift-P, Ctrl+Shift+P + Project Manager: Edit Projects, поддерживает всё что есть в config.cson )

C кодировкой затык т.к. эта функциональность предоставляется плагином

https://atom.io/packages/editorconfig - поддержка кросс-IDE файлов `.editorconfig`

Пример файла `.editorconfig` :

```
root = true

[*.{pl,pm}]
charset = cp-1251
indent_style = space
indent_size = 4
```

https://atom.io/packages/atomic-management - конфигурационные файлы для проектов (не поддерживает кодировку)

https://atom.io/packages/file-templates - шаблоны файлов


В некоторых случаях рекомендую отключать системный плагин whitespace, потому что https://github.com/atom/atom/issues/4741
