def set_path_to_docs(instance, filename):
  return '/'.join(filter(None, ('banker', 'docs, ' f'{str(instance.id)}', filename)))
