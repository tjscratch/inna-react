## Ansible хрень для настройки сервера, в нашем случае создает пользователя, устанавливает необходимые зависимости
и настраивает nginx

### Создание и копирование публичного ключа на сервер:

ssh-keygen -t rsa -C "example@example.com"
scp -P 2223 ~/.ssh/id_rsa.pub username@host:~/.ssh/authorized_keys


### Запуск ansible:

ansible-playbook -i hosts playbook.yml