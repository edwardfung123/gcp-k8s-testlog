docker_image_name=testlog
project=YOUR_GCP_PROJECT_NAME
CONTINAER=testlog
#ts := $(shell /bin/date "+%Y%m%d-%H%M")
ts := 'latest'

default: build

build:
	docker build -t $(docker_image_name) .

run:
	docker run -it -e "NODE_ENV=development" -p 8081:8081 --rm --name $(docker_image_name) $(docker_image_name)

del:
	docker kill $(docker_image_name) $(docker_image_name)

login:
	docker exec -it $(docker_image_name) bash

#tag: check_tag
tag:
	echo "Tag = $(ts)"
	docker tag -f $(docker_image_name) asia.gcr.io/$(project)/$(docker_image_name):$(ts)
	gcloud docker push asia.gcr.io/$(project)/$(docker_image_name):$(ts)

check_tag:
ifndef TAG
	$(error TAG is undefined)
endif

push: check_tag
	gcloud docker push asia.gcr.io/$(project)/$(docker_image_name):$(TAG)

log:
	kubectl logs -f `kubectl get pod | egrep 'altai-pro-ads-test.*Running' | awk -F" " '{print $$1}'` $(CONTINAER) | grep -v "GoogleHC"

deploy:
	kubectl replace -f deployment.yaml
