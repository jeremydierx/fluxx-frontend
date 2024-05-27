#!/bin/bash

################################################################################
# Script de déploiement et de gestion de la maintenance                        #
#                                                                              #
# Utilisation:                                                                 #
#   ./serveurRun.sh [prod|stag] [deploy|maintenance] [on|off]                  #
#                                                                              #
# Paramètres:                                                                  #
#   - [prod|stag]: Spécifie l'environnement de déploiement (production ou      #
#                  staging).                                                   #
#   - [deploy|maintenance]: Spécifie l'action à effectuer (déploiement ou      #
#                           gestion de la maintenance).                        #
#   - [on|off]: Spécifie si la maintenance doit être activée ("on") ou         #
#               désactivée ("off").                                            #
#                                                                              #
# Exemples:                                                                    #
#   - Déploiement en production:                                               #
#     ./serveurRun.sh prod deploy                                              #
#                                                                              #
#   - Activation de la maintenance en staging:                                 #
#     ./serveurRun.sh stag maintenance on                                      #
#                                                                              #
#   - Désactivation de la maintenance en production:                           #
#     ./serveurRun.sh prod maintenance off                                     #
#                                                                              #
################################################################################

# Vérification des paramètres
if [ "$#" -lt 2 ] || { [ "$2" = "maintenance" ] && [ "$#" -ne 3 ]; }; then
    echo "Usage: $0 [prod|stag] [deploy|maintenance] [on|off]"
    exit 1
fi

# Vérification des valeurs possibles pour le premier paramètre
if [ "$1" != "prod" ] && [ "$1" != "stag" ]; then
    echo "Le premier paramètre doit être 'prod' ou 'stag'."
    exit 1
fi

# Vérification des valeurs possibles pour le second paramètre
if [ "$2" != "deploy" ] && [ "$2" != "maintenance" ]; then
    echo "Le deuxième paramètre doit être 'deploy' ou 'maintenance'."
    exit 1
fi

# Vérification des valeurs possibles pour le troisième paramètre si le second est 'maintenance'
if [ "$2" = "maintenance" ] && [ "$3" != "on" ] && [ "$3" != "off" ]; then
    echo "Le troisième paramètre doit être 'on' ou 'off' lorsque le second paramètre est 'maintenance'."
    exit 1
fi

ENVIRONMENT="$1"
ACTION="$2"
MAINTENANCE_STATE="$3"
REPO="git@deployment:jeremydierx/fluxx-frontend.git"
SERVER="my-server"

# Détermination du chemin de l'application en fonction de l'environnement
case $ENVIRONMENT in
    prod)
        APP_PATH="/app-directory/fluxx.fr/frontend"
        MAINTENANCE_FLAG="/app-directory/fluxx.fr/shared/maintenance_on"
        ;;
    stag)
        APP_PATH="/app-directory/stag.fluxx.fr/frontend"
        MAINTENANCE_FLAG="/app-directory/stag.fluxx.fr/shared/maintenance_on"
        ;;
    *)
        echo "Environnement non reconnu. Utilisez 'prod' ou 'stag'."
        exit 1
        ;;
esac

# Boucle sur les hôtes
for HOST in $SERVER
do
    # Déploiement ou gestion de la maintenance en fonction de l'action
    case $ACTION in
        deploy)
            ssh $HOST "
            cd $APP_PATH && \
            rm -rf ./current && \
            git clone $REPO current && \
            cp ./shared/config.js ./current/src/ && \
            cp ./shared/vite.config.js ./current && \
            cd ./current && \
            . ~/.nvm/nvm.sh && nvm use && \
            npm install && \
            npm run build
            "
            ;;
        maintenance)
            case $MAINTENANCE_STATE in
                on)
                    ssh $HOST "touch $MAINTENANCE_FLAG"
                    ;;
                off)
                    ssh $HOST "rm -f $MAINTENANCE_FLAG"
                    ;;
                *)
                    echo "État de maintenance non reconnu. Utilisez 'on' ou 'off'."
                    exit 1
                    ;;
            esac
            ;;
        *)
            echo "Action non reconnue. Utilisez 'deploy' ou 'maintenance'."
            exit 1
            ;;
    esac
done
