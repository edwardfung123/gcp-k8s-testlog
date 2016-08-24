A [expressjs](http://expressjs.com/) application to explore how Kubernetes pod log is sent to the Google Cloud Logging through Fluentd.

# Result

The `stdout` and `stderr` of the container will be logged into a file in the host.
The `fluentd` will parse the logs and send it to the Google Cloud Logging.  

The `fluentd` will parse the logs line by line. 
If the line is a JSON encoded object, the `fluentd` will decode the JSON and use the data to craft Cloud Logging request.
For example, if the log line is

    {"severity": "ERROR", "message": "Houston, we've had a problem here."}
    
Then the log level of the log will be set to `ERROR`.

If the severity is not specified, the log level of stdout and stderr are `INFO` and `ERROR` respectively. Otherwise, `DEFAULT` is used.

To make programmers' life easier, special logger should be used instead of just writing everything unstructured to the `stdout`/`stderr`.
If you make it a JSON, the "payload" type in the Cloud Logging log entry will become `structPayload` and it is more searchable in the [log viewer](https://cloud.google.com/logging/docs/view/logs_viewer)

You can find a simple logger implementation in `lib/logging.js`.

# References

- [Kubernetes GCP Fluentd image](https://github.com/kubernetes/kubernetes/tree/master/cluster/addons/fluentd-gcp/fluentd-gcp-image)
- [Google Fluentd Plugin](https://github.com/GoogleCloudPlatform/fluent-plugin-google-cloud/blob/master/lib/fluent/plugin/out_google_cloud.rb)
- [Google Cloud Logging Viewer](https://cloud.google.com/logging/docs/view/logs_viewer)
- [Google Cloud Logging Viewer Filter](https://cloud.google.com/logging/docs/view/advanced_filters)
